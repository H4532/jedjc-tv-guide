from pathlib import Path
import io
import fitz
import qrcode
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'TV_Channel_Guide.pdf'
SITE_URL = 'https://h4532.github.io/jedjc-tv-guide/'
LOGO_PATH = ROOT / 'assets' / 'holiday-inn-corniche-lockup.webp'

C = [
(1,'Hotel TV','قناة الفندق','information'),(2,'Saudi TV','قناة السعودية','saudi'),(3,'Thikrayat','قناة ذكريات','saudi'),(4,'SBC','إس بي سي','saudi'),(5,'Al Ekhbariya','قناة الإخبارية','saudi'),(6,'Saudia Alaan','السعودية الآن','saudi'),(7,'Quran Channel','قناة القرآن الكريم','saudi'),(8,'Sunnah Channel','قناة السنة النبوية','saudi'),(9,'KSA Sports 1','الرياضية السعودية 1','saudi'),(10,'KSA Sports 2','الرياضية السعودية 2','saudi'),(11,'KSA Sports 3','الرياضية السعودية 3','saudi'),(12,'Ministry of Health','وزارة الصحة','information'),(13,'Dubai Sports 1','دبي الرياضية 1','sports'),(14,'Dubai Sports 2','دبي الرياضية 2','sports'),(15,'Dubai One','دبي ون','entertainment'),(16,'Sky News Arabia Radio','راديو سكاي نيوز عربية','news'),(17,'Euronews','يورونيوز','news'),(18,'Cartoon Network Arabia','كرتون نتورك بالعربية','entertainment'),(19,'Sky News Arabia','سكاي نيوز عربية','news'),(20,'Al Jazeera Mubasher','الجزيرة مباشر','news'),(21,'Al Jazeera Mubasher 2','الجزيرة مباشر 2','news'),(22,'Al Jazeera','الجزيرة','news'),(23,'Al Jazeera English','الجزيرة الإنجليزية','news'),(24,'Al Jazeera Documentary','الجزيرة الوثائقية','documentary'),(25,'Asharq News','الشرق للأخبار','news'),(26,'Asharq Documentary','الشرق الوثائقية','documentary'),(27,'Asharq Discovery','الشرق ديسكفري','documentary'),(28,'National Geographic','ناشيونال جيوغرافيك','documentary'),(29,'Sama Dubai','سما دبي','entertainment'),(30,'Dubai TV','تلفزيون دبي','entertainment'),(31,'Zee Alwan','زي ألوان','entertainment'),(32,'Al Jadeed TV','الجديد','entertainment'),(33,'MTV Lebanon','إم تي في لبنان','entertainment'),(34,'One','ون','entertainment'),(35,'Arabica','أرابيكا','entertainment'),(36,'LBC International','إل بي سي إنترناشيونال','entertainment'),(37,'Dubai Racing 1','دبي ريسينغ 1','sports'),(38,'Dubai Racing 2','دبي ريسينغ 2','sports'),(39,'Tivi5Monde','تيفي 5 موند','documentary'),(40,'TV5Monde Maghreb-Orient','تي في 5 موند المغرب والمشرق','documentary'),(41,'Tivi5Monde','تيفي 5 موند','documentary'),(42,'France 24 Arabic','فرانس 24 العربية','news'),(43,'France 24 Français','فرانس 24 الفرنسية','news'),(44,'France 24 English','فرانس 24 الإنجليزية','news'),(45,'BBC Arabic','بي بي سي عربي','news'),(46,'BBC News','بي بي سي نيوز','news'),(47,'TRT Arabi','تي آر تي عربي','news'),(48,'TRT World','تي آر تي وورلد','news'),(49,'CGTN Arabic','سي جي تي إن العربية','news'),(50,'Al Arabiya','العربية','news'),(51,'Al Arabiya Business','العربية بزنس','news'),(52,'Al Mashhad','المشهد','news'),(53,'ERI TV','إري تي في','entertainment'),(54,'SSad TV','إس ساد تي في','news'),(55,'RTI 1','آر تي آي 1','entertainment'),(56,'Alaan TV','قناة الآن','entertainment'),(57,'Libya Al Wataniya','ليبيا الوطنية','entertainment'),(58,'LTV','إل تي في','entertainment'),(59,'ZAD TV','قناة زاد','entertainment'),(60,'Thmanyah 1','ثمانية 1','newmedia'),(61,'Thmanyah 2','ثمانية 2','newmedia'),(62,'Thmanyah 3','ثمانية 3','newmedia'),(63,'Alkass One','الكأس 1','sports'),(64,'Alkass Two','الكأس 2','sports'),(65,'Alkass Four','الكأس 4','sports'),(66,'MBC 1','إم بي سي 1','entertainment'),(67,'MBC 4','إم بي سي 4','entertainment'),(68,'MBC Drama','إم بي سي دراما','entertainment'),(69,'MBC Bollywood','إم بي سي بوليوود','entertainment'),(70,'MBC 2','إم بي سي 2','entertainment'),(71,'MBC Action','إم بي سي أكشن','entertainment'),(72,'MBC Max','إم بي سي ماكس','entertainment'),(73,'MBC 3','إم بي سي 3','entertainment'),(74,'Wanasah','وناسة','entertainment'),(75,'HDMI / Analogue','منفذ HDMI / بث تماثلي','information')]
assert len(C) == 75 and all(ar.strip() for _,_,ar,_ in C)
assert LOGO_PATH.exists(), f'Missing Option 3 logo: {LOGO_PATH}'
CH = {n:(n,en,ar,cat) for n,en,ar,cat in C}

W,H=1240,1754
GREEN='#00483d'; GREEN2='#0b6757'; PALE='#e3eeeb'; WHITE='#fff'; BG='#f6f6f2'; INK='#17332e'; MUTED='#647670'; GOLD='#b39a58'; LINE='#d7e1de'
FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'; FS='/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'

def font(path,size): return ImageFont.truetype(path,size)
F={'title':font(FS,49),'atitle':font(FB,27),'caps':font(FB,13),'sec':font(FB,16),'num':font(FS,28),'name':font(FB,18),'ar':font(FR,13),'foot':font(FR,11),'qrhead':font(FS,25),'qrtext':font(FR,13)}
LABEL={'information':('INFORMATION','معلومات الفندق'),'saudi':('SAUDI ARABIA','القنوات السعودية'),'sports':('SPORTS','رياضة'),'news':('NEWS','أخبار'),'documentary':('DOCUMENTARY & CULTURE','وثائقيات وثقافة'),'entertainment':('ENTERTAINMENT & FAMILY','ترفيه وعائلة'),'newmedia':('NEW MEDIA','إعلام جديد')}
LOGO_GREEN = Image.open(LOGO_PATH).convert('RGBA')
LOGO_WHITE = Image.new('RGBA', LOGO_GREEN.size, (255,255,255,0))
LOGO_WHITE.putalpha(LOGO_GREEN.getchannel('A'))

def text(d,xy,s,fo,fill,anchor='la',rtl=False):
    kw={}
    if rtl: kw={'direction':'rtl','language':'ar'}
    d.text(xy,s,font=fo,fill=fill,anchor=anchor,**kw)

def rr(d,box,r,fill,outline=None,w=1): d.rounded_rectangle(box,radius=r,fill=fill,outline=outline,width=w)

def page_header(num,en,ar):
    im=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(im)
    d.rectangle((0,0,W,240),fill=GREEN); d.ellipse((W-270,-110,W+80,180),fill=GREEN2)
    logo=LOGO_WHITE.copy(); logo.thumbnail((132,178),Image.Resampling.LANCZOS)
    im.paste(logo,(58,22),logo)
    d.line((210,42,210,198),fill=GOLD,width=3)
    text(d,(238,112),en,F['title'],WHITE,'lm')
    text(d,(W-70,180),ar,F['atitle'],WHITE,'rm',True)
    text(d,(W-70,56),f'TV GUIDE  /  0{num}',F['caps'],'#dce7e4','ra')
    return im,d

def section(d,x,y,w,key):
    a,b=LABEL[key]; rr(d,(x,y,x+w,y+42),12,GREEN); text(d,(x+16,y+22),a,F['sec'],WHITE,'lm'); text(d,(x+w-16,y+22),b,F['sec'],WHITE,'rm',True)

def row(d,x,y,w,n):
    _,en,ar,cat=CH[n]; rr(d,(x,y,x+w,y+54),14,WHITE,LINE)
    rr(d,(x+10,y+8,x+58,y+46),10,GREEN2 if cat=='saudi' else PALE)
    text(d,(x+34,y+27),str(n).zfill(2),F['num'],WHITE if cat=='saudi' else GREEN,'mm')
    text(d,(x+72,y+16),en,F['name'],INK)
    text(d,(x+72,y+39),ar,F['ar'],MUTED,'la',True)

def group(d,x,y,w,key,nums):
    section(d,x,y,w,key); y+=56
    for n in nums: row(d,x,y,w,n); y+=63
    return y

def footer(d,num):
    d.line((60,H-40,W-60,H-40),fill=LINE,width=1)
    text(d,(65,H-20),'Need assistance? Please contact Reception from your room phone.',F['foot'],'#7b8682')
    text(d,(W-65,H-20),'للمساعدة، يرجى التواصل مع الاستقبال من هاتف الغرفة.',F['foot'],'#7b8682','ra',True)
    text(d,(W-40,H-20),str(num),F['caps'],INK,'ra')

def qr_image(size):
    q=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H,box_size=8,border=4); q.add_data(SITE_URL); q.make(fit=True)
    return q.make_image(fill_color='black',back_color='white').convert('RGB').resize((size,size),Image.Resampling.NEAREST)

LX,RX,CW=70,620,510
pages=[]
im,d=page_header(1,'Local essentials & sports','القنوات المحلية والرياضية')
y=group(d,LX,290,CW,'information',[1,12,75]); group(d,LX,y+8,CW,'saudi',list(range(2,12)))
y=group(d,RX,290,CW,'sports',[13,14,37,38,63,64,65])
box=(RX,y+24,RX+CW,y+388); rr(d,box,28,GREEN)
text(d,(RX+28,y+60),'FIND A CHANNEL FASTER',F['caps'],GOLD); text(d,(RX+28,y+112),'Browse the live',F['qrhead'],WHITE); text(d,(RX+28,y+146),'guide',F['qrhead'],WHITE)
text(d,(RX+28,y+182),'Search by number, name, or category.',F['qrtext'],'#dfebe7'); text(d,(RX+28,y+208),'Scan or click the QR code.',F['qrtext'],'#dfebe7')
text(d,(RX+28,y+266),'ابحث بالرقم أو الاسم أو التصنيف',font(FB,18),WHITE,'la',True)
qs=170; qx=RX+CW-qs-28; qy=y+82; rr(d,(qx-12,qy-12,qx+qs+12,qy+qs+12),24,WHITE); im.paste(qr_image(qs),(qx,qy))
text(d,(qx+qs/2,qy+qs+26),'Open the live guide',F['foot'],WHITE,'ma'); text(d,(qx+qs/2,qy+qs+47),'h4532.github.io/jedjc-tv-guide',F['foot'],'#d7e6e1','ma')
text(d,(RX+28,y+330),'Channel availability may change without notice.',F['foot'],'#d4e3de'); footer(d,1); pages.append(im)
im,d=page_header(2,'News, culture & discovery','الأخبار والثقافة والوثائقيات')
group(d,LX,290,CW,'news',[16,17,19,20,21,22,23,25,42,43,44,45,46,47]); y=group(d,RX,290,CW,'news',[48,49,50,51,52,54]); group(d,RX,y+8,CW,'documentary',[24,26,27,28,39,40,41]); footer(d,2); pages.append(im)
im,d=page_header(3,'Entertainment & family','الترفيه والعائلة')
group(d,LX,290,CW,'entertainment',[15,18,29,30,31,32,33,34,35,36,53,55,56]); group(d,RX,290,CW,'entertainment',[57,58,59,66,67,68,69,70,71,72,73,74]); group(d,LX,1180,CW,'newmedia',[60,61,62]); footer(d,3); pages.append(im)

pdf=fitz.open()
for i,im in enumerate(pages):
    p=pdf.new_page(width=595,height=842); b=io.BytesIO(); im.save(b,'PNG',optimize=True); p.insert_image(fitz.Rect(0,0,595,842),stream=b.getvalue())
    if i==0:
        rect=fitz.Rect((qx-12)/W*595,(qy-12)/H*842,(qx+qs+12)/W*595,(qy+qs+12)/H*842)
        p.insert_link({'kind':fitz.LINK_URI,'from':rect,'uri':SITE_URL})
pdf.save(OUT,garbage=4,deflate=True); pdf.close()
chk=fitz.open(OUT); assert chk.page_count==3 and any(x.get('uri')==SITE_URL for x in chk[0].get_links()); chk.close()
print(f'Built {OUT} with Option 3 logo and 75/75 Arabic channel names')

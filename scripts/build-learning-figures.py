from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/guides"
OUT.mkdir(parents=True, exist_ok=True)


def font(size, bold=False):
    names = ["arialbd.ttf", "segoeuib.ttf"] if bold else ["arial.ttf", "segoeui.ttf"]
    for name in names:
        path = Path("C:/Windows/Fonts") / name
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()

# Kalman filter: one scalar update, showing why the result is between the prediction and reading.
w, h = 1200, 440
im = Image.new("RGB", (w, h), "#f3f7f8")
d = ImageDraw.Draw(im)
d.rounded_rectangle((16, 16, w-16, h-16), radius=24, fill="white", outline="#d8e4e7", width=2)
d.text((54, 44), "One Kalman update: move partway toward the reading", font=font(30, True), fill="#173943")
d.text((54, 92), "Estimate = 50 cm   •   predicted uncertainty = 5   •   sensor reading = 54 cm   •   gain K ≈ 0.56", font=font(18), fill="#52666d")
x0, x1, y = 110, 1090, 244
def sx(v): return x0 + (v-48)/(56-48)*(x1-x0)
d.line((x0, y, x1, y), fill="#6b7e83", width=4)
for v in range(48,57,2):
    x=sx(v); d.line((x,y-9,x,y+10), fill="#6b7e83", width=2)
    d.text((x,y+18), str(v), font=font(17), fill="#52666d", anchor="mt")
d.text((x1, y+50), "distance (cm)", font=font(17), fill="#52666d", anchor="rt")
points=[(50,"Prediction", "#16718a", 151),(52.24,"Updated estimate", "#43815a", 133),(54,"Sensor reading", "#d27727", 151)]
for value,label,color,top in points:
    x=sx(value); d.ellipse((x-10,y-10,x+10,y+10), fill=color)
    d.line((x,y-13,x,top+25), fill=color, width=2)
    d.rounded_rectangle((x-100,top-1,x+100,top+28),radius=10,fill="#f6fafb",outline=color,width=2)
    d.text((x,top+13),label,font=font(16,True),fill="#173943",anchor="mm")
d.text((600, 356), "50 + 0.56 × (54 − 50) = 52.24 cm", font=font(23, True), fill="#173943", anchor="mm")
im.save(OUT / "kalman-one-update.png", optimize=True)

# Road Runner route: three changes of position/heading are visually distinguished.
w,h=1200,700
im=Image.new("RGB",(w,h),"#f3f7f8"); d=ImageDraw.Draw(im)
d.rounded_rectangle((18,18,w-18,h-18),radius=26,fill="white",outline="#d8e4e7",width=2)
d.text((62,48),"Road Runner: read the route one action at a time",font=font(30,True),fill="#173943")
d.text((62,94),"Practice coordinates only. Check your Quickstart coordinate frame and robot footprint before driving.",font=font(18),fill="#52666d")
left,top,right,bottom=150,155,1080,540
xmin,xmax,ymin,ymax=0,44,0,34
def pt(x,y): return (int(left+(x-xmin)/(xmax-xmin)*(right-left)),int(bottom-(y-ymin)/(ymax-ymin)*(bottom-top)))
for x in range(0,45,4):
    px,_=pt(x,0); d.line((px,top,px,bottom),fill="#e6edef",width=1); d.text((px,bottom+10),str(x),font=font(15),fill="#52666d",anchor="mt")
for yv in range(0,35,4):
    _,py=pt(0,yv); d.line((left,py,right,py),fill="#e6edef",width=1); d.text((left-18,py),str(yv),font=font(15),fill="#52666d",anchor="rm")
d.line((left,top,left,bottom),fill="#38545c",width=3); d.line((left,bottom,right+14,bottom),fill="#38545c",width=3)
d.polygon([(right+14,bottom),(right,bottom-8),(right,bottom+8)],fill="#38545c")
d.text((right-16,bottom+40),"X position",font=font(17,True),fill="#38545c")
d.text((74,top-20),"Y position",font=font(17,True),fill="#38545c")
p0,p1,p2=pt(12,12),pt(36,12),pt(36,30)
d.line((p0,p1),fill="#16718a",width=8); d.line((p1,p2),fill="#43815a",width=8)
def arrowhead(a,b,color):
    import math
    dx=b[0]-a[0];dy=b[1]-a[1];L=(dx*dx+dy*dy)**0.5; ux,uy=dx/L,dy/L; px,py=-uy,ux
    q=(b[0]-ux*20,b[1]-uy*20)
    d.polygon([b,(int(q[0]+px*10),int(q[1]+py*10)),(int(q[0]-px*10),int(q[1]-py*10))],fill=color)
arrowhead(p0,p1,"#16718a");arrowhead(p1,p2,"#43815a")
for p,c in [(p0,"#16718a"),(p1,"#d27727"),(p2,"#43815a")]: d.ellipse((p[0]-12,p[1]-12,p[0]+12,p[1]+12),fill="white",outline=c,width=5)
d.text((p0[0]-8,p0[1]+24),"Start (12, 12, 0°)",font=font(17,True),fill="#173943",anchor="mt")
d.text((p1[0],p1[1]+24),"1  Arrive at (36, 12)",font=font(16,True),fill="#173943",anchor="mt")
d.text((p1[0]+24,p1[1]-26),"2  Turn +90°",font=font(16,True),fill="#173943")
d.text((p2[0]-8,p2[1]-34),"3  Strafe to (36, 30)",font=font(16,True),fill="#173943",anchor="mb")
d.rounded_rectangle((90,610,w-90,666),radius=14,fill="#eef7f8")
d.text((w//2,638),"Position uses field units; heading is in radians in Road Runner code.",font=font(18,True),fill="#173943",anchor="mm")
im.save(OUT/"road-runner-first-route.png",optimize=True)

# Pure Pursuit: clean distinction between path, robot, radius, and selected forward intersection.
w,h=1200,620
im=Image.new("RGB",(w,h),"#f3f7f8");d=ImageDraw.Draw(im)
d.rounded_rectangle((18,18,w-18,h-18),radius=26,fill="white",outline="#d8e4e7",width=2)
d.text((62,48),"Pure Pursuit chooses a point ahead on the path",font=font(30,True),fill="#173943")
d.text((62,94),"The controller repeats this selection as the robot moves.",font=font(18),fill="#52666d")
# local drawing coordinates
robot=(380,390); radius=220
# curved path polyline that intersects lookahead circle ahead of robot
path=[(110,480),(220,460),(320,420),(410,355),(505,300),(610,260),(735,225),(880,207),(1040,212)]
d.line(path,fill="#16718a",width=9,joint="curve")
# lookahead circle, only outline
bbox=(robot[0]-radius,robot[1]-radius,robot[0]+radius,robot[1]+radius)
d.ellipse(bbox,outline="#d27727",width=4)
# robot marker + heading to right
d.rounded_rectangle((robot[0]-48,robot[1]-34,robot[0]+48,robot[1]+34),radius=14,fill="#e8f4f6",outline="#38545c",width=4)
d.polygon([(robot[0]+50,robot[1]),(robot[0]+27,robot[1]-14),(robot[0]+27,robot[1]+14)],fill="#38545c")
d.text((robot[0]-6,robot[1]+50),"robot pose",font=font(18,True),fill="#173943",anchor="mt")
# selected forward intersection (approx on curve)
look=(565,275)
d.ellipse((look[0]-12,look[1]-12,look[0]+12,look[1]+12),fill="#d27727",outline="white",width=3)
# radius indicator
d.line((robot[0],robot[1],look[0],look[1]),fill="#d27727",width=3)
d.text((440,352),"lookahead distance",font=font(17,True),fill="#a85d1c")
d.text((look[0]+23,look[1]-10),"selected lookahead point",font=font(18,True),fill="#173943")
# waypoint marks along curve
for p in [path[1],path[3],path[5],path[7]]: d.ellipse((p[0]-6,p[1]-6,p[0]+6,p[1]+6),fill="#59757d")
d.text((120,514),"planned path",font=font(18,True),fill="#16718a")
d.text((785,333),"Choose the forward intersection;\nignore points behind the robot.",font=font(18),fill="#52666d",spacing=6)
im.save(OUT/"pure-pursuit-lookahead.png",optimize=True)

print("Wrote Kalman, Road Runner, and Pure Pursuit teaching figures")

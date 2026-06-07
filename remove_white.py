import sys
import subprocess

try:
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image

img = Image.open('public/images/logo.png').convert("RGBA")
datas = img.getdata()

newData = []
for item in datas:
    # Change white (also shades of white) to transparent
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)

img.putdata(newData)
img.save('public/images/logo.png', "PNG")
print("Successfully made the background transparent!")

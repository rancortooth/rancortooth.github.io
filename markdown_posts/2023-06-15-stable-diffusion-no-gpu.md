---
date: "2023-06-15"
title: How to run StableDiffusion AI on Windows with NO GPU
image: robot-face.png
categories: AI
tags: ai
---
##### (image generated with stable_diffusion.openvino)

# Running StableDiffusion AI on Windows with NO GPU

## Prerequisites
* Windows 10/11 PC, laptop
* Git
* Python 3.10.x
* Administrator access on your Windows machine
* Machine should have at least 8GB of RAM but 16GB or more is better
* Free disk space > 30GB (for messing around, not strictly necessary)

## Steps

<img src="assets/images/warning.png" width="30px"> **I had to edit 'requirements.txt' and upgrade numpy from '1.19.5' to '1.21.6' in order for this to work with python 3.10.x**

### Note: All work should be done in a powershell script with administrive privilleges
* Install prerequisites if you don’t have them already:
    * Git + Python
* Side note: Do a quick upgrade of your pip if needed:
```bash
python -m pip install --upgrade pip
```
* Clone StableDiffusion:
```bash
git clone https://github.com/bes-dev/stable_diffusion.openvino
```
* CD into where you cloned the repository
* Install openvino library with pytorch:
```bash
pip install openvino-dev[onnx,pytorch]==2022.3.0
```
* Install the rest of StableDiffusions dependencies:
```bash
pip install -r requirements.txt
```
<p>
## Running stable diffusion AI
```
python .\demo.py --prompt "kitten car"
```
<p>
## Powershell script to run many iterations of the same prompt
### Save this script as "runmany.ps1" and run as "./runmany.ps1 5 "colorful school bus"
```
echo "Start of Loop"
$num=$args[0]

for($i=1; $i -le $num; $i=$i+1) {
  $ts=$(Get-Date -Format "MM-dd-yyyy-HH-mm-ss")
  python .\demo.py --prompt "$args[1]" --output "image_$ts.png"
}

echo "Done!!!"
```


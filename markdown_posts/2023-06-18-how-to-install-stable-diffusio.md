---
date: "2023-06-18"
title: How to Install Stable Diffusion on Old Macbook
image: how-to-install-stable-diffusio.png
categories: ai
tags: ai,stablediffusion,mac
---

#####(image generated with stable_diffusion.openvino)

# How to Install Stable Diffusion on Old Macbook

I have an old 2013 Macbook Pro lying around which I wanted to get Stable Diffusion running on. Unfortunately, Stable Diffusion cannot take advantage of the old Macbook's GPU capabilities, but you can still run stable_diffusion.openvino on it, albeit a bit slower.

<img src="assets/images/warning.png" width="30px"> **I started with a totally clean install of MacOS on my old Macbook, so I had to install lots of prerequisites. This process took HOURS to complete!**

## Here are the steps I did:
1. Install brew if you don't already have it. Go to the <a href="https://brew.sh/" target="_blank">brew homepage for these instructions</a>
<p>
2. Install some dependencies via brew:
```bash
brew install python3.9
brew install gfortran (<-- took a very long time to install)
brew install openblas (<-- took a long time to install)
brew install jpeg
```
<p>
3. Set **PKG\_CONFIG\_PATH** so the wheel builds can find their libraries:
```
export PKG_CONFIG_PATH="/usr/local/opt/openblas/lib/pkgconfig:/usr/local/opt/jpeg/lib/pkgconfig"
```
<p>
4. Clone StableDiffusion:
```bash
git clone https://github.com/bes-dev/stable_diffusion.openvino
```
<p>
5. A few python related upgrades were necessary:
```
python3 -m pip install --upgrade pip
python3 -m pip install --upgrade pillow
pip3 install --upgrade setuptools
```
<p>
6. Change directories into **stable_diffusion.openvino**
<p>
7. Edit the **requirements.txt** file and change the contents to look like this:
```text
numpy==1.24.3
opencv-python==4.5.5.64
transformers==4.16.2
diffusers==0.2.4
tqdm==4.64.0
openvino==2023.0.0
huggingface_hub==0.9.0
scipy==1.9.3
streamlit==1.12.0
watchdog==2.1.9
ftfy==6.1.1
streamlit_drawable_canvas==0.9.1
pillow==9.0.1
piexif==1.1.3
```
<p>
8. Install stable diffusion's requirements:
```bash
pip3 install -r requirements.txt
```
<p>
## Troubleshooting issues
* Most of the time the issues were related to the versions of scipy, pillow, and openvino not being just right in the requirements.txt file
* The errors produced can be insanely verbose, but the most helpful info is typically near the end of the stacks

<p>
## Running stable diffusion AI
```
python .\demo.py --prompt "kitten car"
```

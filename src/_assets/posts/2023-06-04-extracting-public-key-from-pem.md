##### (image generated with stable_diffusion.openvino)

# Extraing a public key from a PEM file

If you have a private key in the form of a PEM file, you can extract its public key. Just run the following command with your private key and redirect the output to a new file to contain the public key.

```bash
ssh-keygen -y -f private_key1.pem > public_key1.pub
```

And afterward, "public_key1.pub" should contain something like
```
ssh-rsa AAA3Bz........
```
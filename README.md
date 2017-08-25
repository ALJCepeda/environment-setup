Steps for success (must be sudo):

```
apt-get install git
mkdir repos
cd repos
git clone https://github.com/ALJCepeda/environment-setup.git
cd environment-setup
./init.sh
```

Wait for completion then modify `config.yml` to your liking and ..

`npm run playbooks`

#Change password for users:

`password <username>`

#Add user to samba (prompts for password):

`smbpasswd -a <username>`

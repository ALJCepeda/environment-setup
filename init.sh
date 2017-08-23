apt-add-repository ppa:ansible/ansible
apt-get update
apt-get install ansible

ansible-playbook -i "localhost," -c local init.yml

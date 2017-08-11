- hosts: all
  remote_user: root
  become: yes
  tasks:
    - name: clone ajcepeda
      git: repo=git@github.com:ALJCepeda/aljcepeda.git
        dest=/sources/ajcepeda
        key_file=/home/god/.ssh/id_rsa
        accept_hostkey=true

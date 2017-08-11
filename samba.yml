- hosts: all
  remote_user: root
  become: yes
  handlers:
    - name: restart samba
      service: name=smbd state=restarted
  tasks:
    - name: Install Samba
      apt: name=samba state=latest
    
    - name: file
      vars:
        path: /sources 
      template: src=samba.tpl dest=/etc/samba/smb.conf

    - name: Samba group
      group: name=sambagrp state=present

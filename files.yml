- hosts: all
  remote_user: root
  become: yes
  tasks:
  - name: Setup sources folder
    file: path=/sources state=directory owner=root group=sambagrp recurse=yes mode=774

  - name: Ansible Files folder
    file: path=/ansible_files state=directory mode=744

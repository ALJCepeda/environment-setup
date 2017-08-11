- hosts: all
  remote_user: root
  become: yes
  tasks:
  - name: Install Apts
    apt: pkg={{ item }} update_cache=yes
    with_items:
      - git
      - openssh-server

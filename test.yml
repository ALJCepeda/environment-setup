---
- hosts: all
  vars_files:
    - config.yml
  tasks:
   - debug: "{{ item }}"
     with_items:
       - "{{ users }}"

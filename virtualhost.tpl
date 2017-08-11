<VirtualHost *:{{ port }}>
  ServerAdmin admin@{{ domain }}
  ServerName {{ domain }}
  ServerAlias www.{{ domain }}
  DocumentRoot {{ path }}
  ErrorLog {{ errorPath }}/error.log
  CustomLog {{ accessPath }}/access.log combined
</VirtualHost>

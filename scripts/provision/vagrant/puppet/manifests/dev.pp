$as_vagrant   = 'sudo -u vagrant -H bash -l -c'
$home         = '/home/vagrant'
$app          = '/vagrant'
$scripts      = '/vagrant/scripts'

Exec {
  path => ['/usr/sbin', '/usr/bin', '/sbin', '/bin']
}

exec { 'clean_node_modules':
  command => "${as_vagrant} 'rm -rf /vagrant/node_modules'",
  cwd => $app,
  tries => 2
}

exec { 'npm_install':
  command => "${as_vagrant} 'npm install'",
  cwd => $app,
  timeout => 0,
  tries => 3
}

exec { 'npm_install_gulp_globally':
  command => "sudo npm install -g gulp",
  cwd => $app,
  timeout => 0,
  tries => 3
}

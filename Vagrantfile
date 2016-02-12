# -*- mode: ruby -*-
# vi: set ft = ruby :

Vagrant.configure('2') do |config|

  ### BASE BOX & VM

  config.vm.box      = 'puppetlabs/ubuntu-14.04-64-puppet'
  config.vm.hostname = "armchairdj.com"

  # Tests? NEEDED?
  config.vm.network :forwarded_port, host: 9060, guest: 9060, auto_correct: true

  # Nginx.
  config.vm.network :forwarded_port, host: 9070, guest: 80, auto_correct: true

  # Node. NEEDED?
  config.vm.network :forwarded_port, host: 9080, guest: 8000

  # Mongo.
  config.vm.network :forwarded_port, host: 9090, guest: 27017, auto_correct: true

  # Private network. NEEDED?
  config.vm.network 'private_network', ip: '192.168.10.82'

  ### VIRTUALBOX

  config.vm.provider 'virtualbox' do |v|
    v.name   = 'armchairdj'
    v.memory = 2048
    v.cpus   = 2
    # Fixes DNS issue in Ubuntu VMs.
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
  end

  ### SYNCED FOLDER

  config.vm.synced_folder '.', '/vagrant', nfs: { mount_options: ['actimeo=2'] }

  ### SHELL PROVISIONER

  config.vm.provision :shell, path: 'script/provision/development/bootstrap.sh'

end

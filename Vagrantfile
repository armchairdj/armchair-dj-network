# -*- mode: ruby -*-
# vi: set ft = ruby :

VAGRANTFILE_API_VERSION = '2'

SYNCED_FOLDER           = '/vagrant'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  ### BASE BOX & VM

  config.vm.box      = 'puppetlabs/ubuntu-14.04-64-puppet'
  config.vm.hostname = "armchairdj.com"

  # Tests? TODO BJD
  config.vm.network :forwarded_port, host: 9070, guest: 9070, auto_correct: true

  # Nginx.
  config.vm.network :forwarded_port, host: 9080, guest: 80, auto_correct: true

  # Mongo/
  config.vm.network :forwarded_port, host: 9090, guest: 27017, auto_correct: true

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

  config.vm.synced_folder '.', SYNCED_FOLDER, nfs: { mount_options: ['actimeo=2'] }

  ### SHELL PROVISIONER

  config.vm.provision :shell, path: 'scripts/provision/vagrant/bootstrap.sh'

end

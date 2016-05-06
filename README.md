# armchair-dj-network

Node/Express/Connect/Mongo-based CMS, back ends and front ends for my dynamic and static personal sites.

# Dev environment

    # Automatically update guest additions.
    vagrant plugin install vagrant-vbguest

    # Fix file ownership issues on NFS-mounted /vagrant directory.
    vagrant plugin install vagrant-bindfs

    # Automatic host entries for local development and nginx testing.
    vagrant plugin install vagrant-hostsupdater

    # Hooks to run arbitrary scripts before/after vagrant commands.
    vagrant-triggers

    # Bootstrap and provision.
    vagrant up

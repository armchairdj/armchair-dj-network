# armchair-dj.com

Node/Express/Connect/Mongo-based CMS, back end and front end for armchair-dj.com, my music blog.

# Dev environment

    # Automatically update guest additions.
    vagrant plugin install vagrant-vbguest

    # Fix file ownership issues on NFS-mounted /vagrant directory.
    vagrant plugin install vagrant-bindfs

    # Automatic host entries for local development and nginx testing.
    vagrant plugin install vagrant-hostsupdater

    # Bootstrap and provision.
    vagrant up

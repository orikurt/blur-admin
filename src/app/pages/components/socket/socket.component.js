angular.module('BlurAdmin').service('socket', function(){
  var self = this;
  self.data = {};

  console.log('BlurAdmin Socket Service!');

  self.socket = io.connect(window.location.protocol + '//' + window.location.host, {
    'forceNew': true,
    'secure': true
  });

  self.socket.on('update:count', function(count){
    console.log('socket:: count update', count);
    self.data.online = count.count;
    self.data.onlineUsers = count.users;
  });

  self.socket.on('update:users', function(users){
    console.log('socket:: users update', users);
    self.data.users = users;
  });

  self.socket.on('update:stocks', function(all_stock){
    console.log('socket:: stocks update', all_stock);
    self.data.stocks = all_stock;
  });

});

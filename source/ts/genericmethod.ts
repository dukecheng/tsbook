///<reference path="../../typings/index.d.ts" />
class User {
  name: string;
  age: number;
}

class Order {
  id: number;
  total: number;
  items: any[];
}

function getUsers(cb: (users: User[]) => void): void {
  $.ajax({
    url: "api/users",
    method: "GET",
    success: function(data) {
      cb(data.items);
    },
    error: function(error) {
      cb(null);
    }
  });
}

function getEntities<T>(url: string, cb: (list: T[]) => void): void {
  $.ajax({
    url: url,
    method: "GET",
    success: function(data) {
      cb(data.items);
    },
    error: function(error) {
      cb(null);
    }
  });
}

getUsers(function(users: User[]) {
  for (let i = 0; i < users.length; i++) {
    console.log(users[i].name);
  }
});

getEntities<User>("/api/users", function(users: User[]) {
  for (let i = 0; i < users.length; i++) {
    console.log(users[i].name);
  }
});

getEntities<Order>("/api/orders", function(orders: Order[]) {
  for (let i = 0; i < orders.length; i++) {
    console.log(orders[i].id);
  }
});

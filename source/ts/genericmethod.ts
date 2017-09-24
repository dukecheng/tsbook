///<reference path="../../typings/globals/jquery/index.d.ts" />
class User {
  name: string;
  age: number;
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

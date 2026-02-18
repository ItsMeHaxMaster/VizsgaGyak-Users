using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime Birthday { get; set; }

       public User(int id, string name, string email, DateTime birthday)
        {
            Id = id;
            Name = name;
            Email = email;
            Birthday = birthday;
        }
    }
}

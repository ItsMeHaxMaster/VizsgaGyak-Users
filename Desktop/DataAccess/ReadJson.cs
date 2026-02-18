using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using Newtonsoft.Json;

namespace DataAccess
{
    public class ReadJson
    {
        public List<User> ReadFromJson(string json)
        {
            string jsonContent = File.ReadAllText(json);
            return JsonConvert.DeserializeObject<List<User>>(jsonContent);
        }
    }
}

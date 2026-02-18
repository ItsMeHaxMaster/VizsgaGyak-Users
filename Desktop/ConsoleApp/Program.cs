using DataAccess;
using Newtonsoft.Json;

namespace ConsoleApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string path = @"users.json";

            ReadJson readJson = new ReadJson();
            List<User> users= readJson.ReadFromJson(path);

            ListUsers(users);
            Console.WriteLine();
            SearchByName(users);


            Console.ReadLine();
        }

        static void ListUsers(List<User> users)
        {
            Console.WriteLine("1. Felhasználók listázása ABC sorrendben:");
            Console.WriteLine();

            users.Sort((x, y) => string.Compare(x.Name, y.Name));
            foreach (var user in users)
            {
                Console.WriteLine($"Id: {user.Id} \n\tNév: {user.Name} \n\tEmail: {user.Email} \n\tSzületésnap: {user.Birthday:yyyy-MM-dd}\n");
            }

            Console.WriteLine();

        }

        static void SearchByName(List<User> users)
        {
            Console.WriteLine("2. Keresés keresztnév alapján. \nAdjon meg egy keresztnevet: ");
            try
            {
                string name = Console.ReadLine().ToString();
                List<User> search = users.FindAll(u => u.Name.Contains(name, StringComparison.OrdinalIgnoreCase));

                if(search.Count > 0)
                {
                    Console.WriteLine($"\n{search.Count} találat:");
                    foreach (var user in search)
                    {
                        Console.WriteLine($"Id: {user.Id} \n\tNév: {user.Name} \n\tEmail: {user.Email} \n\tSzületésnap: {user.Birthday:yyyy-MM-dd}\n");
                    }
                }
                else
                {
                    Console.WriteLine("Nincs találat a megadott keresztnévvel.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Hiba történt a keresztnév beolvasása során: " + ex.Message);
            }
        }
    }
}

//jelenítse meg a legidősebb felhasználó adatait.
//listázza ki a március 1. és június 30. között született felhasználókat születési dátum szerint növekvő sorrendben.
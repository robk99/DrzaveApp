using System;
using System.Linq;
using System.Security.Cryptography;

namespace BLL.Services
{
    public static class HashUserPasswordService
    {
        private const int SaltSize = 16; // 128 bit 
        private const int KeySize = 32; // 256 bit
        private const int Iterations = 10000; // 256 bit

        public static string HashPassword(string password)
        {
            using (var algorithm = new Rfc2898DeriveBytes(
                password,
                SaltSize,
                Iterations,
                HashAlgorithmName.SHA512))
            {
                string key = Convert.ToBase64String(algorithm.GetBytes(KeySize));
                string salt = Convert.ToBase64String(algorithm.Salt);

                return $"{Iterations}.{salt}.{key}";
            }
        }

        public static bool ValidatePassword(string hash, string password)
        {
            var parts = hash.Split('.', 3);
            
            int iterations = Convert.ToInt32(parts[0]);
            byte[] salt = Convert.FromBase64String(parts[1]);
            byte[] key = Convert.FromBase64String(parts[2]);

            using (var algorithm = new Rfc2898DeriveBytes(
              password,
              salt,
              iterations,
              HashAlgorithmName.SHA512))
            {
                byte[] keyToCheck = algorithm.GetBytes(KeySize);
                bool verified = keyToCheck.SequenceEqual(key);

                return verified;
            }
        }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces.Services;
using DAL;
using DAL.Models;

namespace BLL.Services
{
    public class UserService : IUserService
    {
        private readonly CountriesdbContext _context;

        public UserService(CountriesdbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUser(string username)
        {
            return await _context.Users.FindAsync(username);
        }

        public async Task<User> PostUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}
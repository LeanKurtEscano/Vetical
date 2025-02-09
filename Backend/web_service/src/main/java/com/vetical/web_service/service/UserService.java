package com.vetical.web_service.service;


import com.vetical.web_service.model.User;
import com.vetical.web_service.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;


    public void saveUser(User user) {
        repo.save(user); // Just save the user, no return needed
    }

}

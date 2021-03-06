package com.bench.netflix.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bench.netflix.model.User;
import com.bench.netflix.model.UserList;
import com.bench.netflix.repo.UserRepository;
import com.bench.netflix.service.UserListService;
import com.bench.netflix.service.UserService;
//@CrossOrigin(origins="http://localhost:3000")
@CrossOrigin("*")

@RestController
//@RequestMapping("/api/")
public class UserController 
{
	@Autowired
	UserService userService;
	
	@Autowired
	UserListService userListService;
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("users")
    public ResponseEntity<?> listUsers() {
        List<User> resource = userService.getUsers();
        return ResponseEntity.ok(resource);
    }
	
	@PostMapping("user")
    public ResponseEntity<?> User(@RequestBody User user) {
		String email = user.getEmail();
		System.out.println("email from controller is : "+email);
        User resource = userService.loadUserByUserEmail(email);
		System.out.println("user from controller is : "+resource);

        return ResponseEntity.ok(resource);
    }
	
	
	@PostMapping("new")
	public ResponseEntity<?> saveUser(@RequestBody User user) {
        User resource = userService.saveUser(user);
        return ResponseEntity.ok(resource);
    }
	
	
	
	@PostMapping("newuserlist")
	public void saveUserList(@RequestBody UserList userList) {
		System.out.println("gefore fetch userlist"+userList );

        userListService.saveUserList(userList);
    }
	
	@PostMapping("userslist")
    public ResponseEntity<?> listUsersList() {
        List<UserList> resource = userListService.getUserslist();
        return ResponseEntity.ok(resource);
    }
	
	@PostMapping("userlist")
    public ResponseEntity<?> listUserList(@RequestBody UserList userList) {
        List<UserList> resource = userListService.getUserlist(userList.getEmail());
        return ResponseEntity.ok(resource);
    }
	
	@PostMapping("deleteuserlist")
    public void deleteUserList(@RequestBody UserList userList) {
        System.out.println("email "+ userList.getEmail());
        System.out.println("movieid "+ userList.getMovieid());

        userListService.deleteUserlist(userList.getEmail(), userList.getMovieid());
        System.out.println("deleted from userlist from controller");

    }
}

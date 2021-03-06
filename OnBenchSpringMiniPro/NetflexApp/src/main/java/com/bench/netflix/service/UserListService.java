package com.bench.netflix.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.bench.netflix.model.UserList;
import com.bench.netflix.repo.UserListRepository;

@Service
public class UserListService {
	
	UserListRepository userListRepository;
	
	public UserListService(UserListRepository userListRepository) {
        this.userListRepository = userListRepository;
    }
	
	public void saveUserList(UserList  userList) {
		if(!userListRepository.existsByEmailAndMovieid(userList.getEmail(), userList.getMovieid()))
			 userListRepository.save(userList);
    }
	
	public List<UserList> getUserslist() {
        return userListRepository.findAll();
    }
	public List<UserList> getUserlist( String userEmail) {
        return userListRepository.findByEmail(userEmail);
    }
	public void deleteUserlist( String userEmail, String movieid) {
		System.out.println("before deletin "+userEmail +" "+ movieid);
		UserList userList = userListRepository.getUserList(userEmail, movieid);
        userListRepository.deleteById(userList.getId());
		//userListRepository.deleteByEmailAndMovieid(userEmail, movieid);
		System.out.println("after deletin "+userEmail +" "+ movieid);

    }
	
	
	
	
}

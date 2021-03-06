package com.bench.netflix.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="userlist")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserList 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String email;
	
	private String movieid;
	
	private String movieurl;
	
	private String movietitle;
	
	private String moviename;

	private String movieoriginalname;


}

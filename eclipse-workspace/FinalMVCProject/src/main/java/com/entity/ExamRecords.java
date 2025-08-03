package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConsturctor
public class ExamRecords {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer recid;
	private String examtype;
	private String examdate;
	private Integer marks;
	@ManyToOne
	@JoinColumn(name="student")
	private Student student;
	public ExamRecord()
}
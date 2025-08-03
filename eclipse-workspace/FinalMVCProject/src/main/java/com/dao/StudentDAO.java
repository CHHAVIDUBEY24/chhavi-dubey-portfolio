package com.dao;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.model.Student;
import com.util.SessionBuilder;

@Component
public class StudentDAO {

    @Autowired
    private SessionBuilder sb;p

    public void save(Student ob) {
        Session session = sb.getSession();
        session.save(ob);
        session.beginTransaction().commit();
        System.out.println("Student Added Successfully...");
    }

    public Student get(int sid) {
        Session session = sb.getSession();
        Student s = session.get(Student.class, sid);
        return s;
    }
}
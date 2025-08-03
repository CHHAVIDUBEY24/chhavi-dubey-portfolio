package com.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Component;

@Component
public class SessionBuilder {

    public static SessionFactory sf;

    public SessionBuilder() {
        if (sf == null)
            sf = new Configuration().configure().buildSessionFactory();
    }

    public static Session getSession() {
        return sf.openSession();
    }
}
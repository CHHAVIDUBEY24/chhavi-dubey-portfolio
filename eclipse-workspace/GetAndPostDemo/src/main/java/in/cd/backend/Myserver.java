package in.cd.backend;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/submitForm")
public class Myserver extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        out.println("<h3>Please submit the form instead of accessing the URL directly.</h3>");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String myemail = req.getParameter("email1");
        String mypassword = req.getParameter("pass1");

        PrintWriter out = resp.getWriter();

        if (myemail.equals("chhavi@gmail.com") && mypassword.equalsIgnoreCase("abc")) {
            out.println("<h3>Login Successful!</h3>");
        } else {
            out.println("<h3>Login Failed. Invalid credentials.</h3>");
        }
    }
}

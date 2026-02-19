package com.events.eventshub.controller;

import com.events.eventshub.entity.Event;
import com.events.eventshub.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/admin/create-event")
    public String showEventForm(Model model) {
        model.addAttribute("event", new Event());
        return "create-event";
    }

    @PostMapping("/admin/create-event")
    public String createEvent(@ModelAttribute Event event) {
        eventRepository.save(event);
        return "redirect:/dashboard";
    }
}

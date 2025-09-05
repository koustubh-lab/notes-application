package com.koustubh.notes_application.utils;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AuthRequest {
    @Email
    private String email;
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;
}

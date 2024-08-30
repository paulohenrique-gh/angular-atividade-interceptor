export interface UserRegistration {
    username: string;
    password: string;
    role: 'admin' | 'doctor' | 'receptionist' | 'patient'
}

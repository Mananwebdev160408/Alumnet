export const TEST_CREDENTIALS = {
  superadmin: {
    email: "admin@alumnet.com",
    password: "admin123",
    label: "Super Admin",
    role: "super_admin",
    description: "Global site administration and node management",
    name: "SysAdmin Zero"
  },
  collegeadmin: {
    email: "iitd_admin@alumnet.com",
    password: "admin123",
    label: "College Admin",
    role: "college_admin",
    description: "Institutional management for IIT Delhi",
    name: "Registrar Alpha"
  },
  alumni: {
    email: "alumni@alumnet.com",
    password: "alumni123",
    label: "Alumni",
    role: "alumni",
    description: "Verified alumni within the network",
    name: "Sarah Chen"
  },
  student: {
    email: "student@alumnet.com",
    password: "student123",
    label: "Student",
    role: "student",
    description: "Standard student access",
    name: "James Miller"
  }
};

export type TestRole = keyof typeof TEST_CREDENTIALS;

export class DataGenerator {
  private static readonly firstNames = ['Aarav', 'Priya', 'Rohan', 'Ananya', 'Vikram', 'Sneha', 'Arjun', 'Kavya', 'Rahul', 'Meera', 'Aditya', 'Pooja', 'Karan', 'Divya', 'Nikhil'];
  private static readonly lastNames = ['Sharma', 'Patel', 'Gupta', 'Singh', 'Kumar', 'Reddy', 'Nair', 'Joshi', 'Verma', 'Rao', 'Mishra', 'Chopra', 'Mehta', 'Das', 'Iyer'];
  private static readonly emailDomains = ['example.com', 'testmail.com', 'mailtest.org', 'qatest.net', 'autotest.io'];

  static randomFirstName(): string {
    return this.randomItem(this.firstNames);
  }

  static randomLastName(): string {
    return this.randomItem(this.lastNames);
  }

  static randomName(): string {
    return `${this.randomFirstName()} ${this.randomLastName()}`;
  }

  static randomPhone(): string {
    // Indian mobile numbers: starts with 6-9, followed by 9 digits
    const startDigit = this.randomItem([6, 7, 8, 9]);
    const rest = Math.floor(100000000 + Math.random() * 900000000).toString();
    return `${startDigit}${rest}`;
  }

  static randomEmail(): string {
    const timestamp = Date.now();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const first = this.randomFirstName().toLowerCase();
    const last = this.randomLastName().toLowerCase();
    const domain = this.randomItem(this.emailDomains);
    return `${first}.${last}.${timestamp}${rand}@${domain}`;
  }

  static randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static randomAadhaar(): string {
    // 12-digit number starting with 2-9
    const start = Math.floor(2 + Math.random() * 8);
    const rest = Math.floor(10000000000 + Math.random() * 90000000000).toString();
    return `${start}${rest}`.slice(0, 12);
  }

  static randomPincode(): string {
    // Indian pincodes: 6 digits, first digit 1-9
    const start = Math.floor(1 + Math.random() * 9);
    const rest = Math.floor(10000 + Math.random() * 90000).toString();
    return `${start}${rest}`;
  }
}

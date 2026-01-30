export interface Personality {
  id: string;
  name: string;
}

// Static list of 1000 most famous Indian personalities organized by category (100 per category)
const INDIAN_PERSONALITIES_BY_CATEGORY: Record<string, string[]> = {
  // Bollywood Actors - Male (100)
  bollywoodActorsMale: [
    'Shah Rukh Khan', 'Amitabh Bachchan', 'Salman Khan', 'Aamir Khan', 'Akshay Kumar',
    'Hrithik Roshan', 'Ranbir Kapoor', 'Ranveer Singh', 'Varun Dhawan', 'Tiger Shroff',
    'Rajesh Khanna', 'Dilip Kumar', 'Raj Kapoor', 'Dev Anand', 'Naseeruddin Shah',
    'Irrfan Khan', 'Nawazuddin Siddiqui', 'Pankaj Tripathi', 'Rajkummar Rao', 'Ayushmann Khurrana',
    'Vicky Kaushal', 'Kartik Aaryan', 'Sidharth Malhotra', 'Arjun Kapoor', 'Aditya Roy Kapur',
    'Ishaan Khatter', 'Shahid Kapoor', 'Saif Ali Khan', 'Ajay Devgn', 'Anil Kapoor',
    'Sunny Deol', 'Bobby Deol', 'Abhishek Bachchan', 'John Abraham', 'Emraan Hashmi',
    'Riteish Deshmukh', 'Arshad Warsi', 'Akshaye Khanna', 'Imran Khan', 'Ranvir Shorey',
    'Kay Kay Menon', 'Manoj Bajpayee', 'Sanjay Dutt', 'Sunil Shetty', 'Randeep Hooda',
    'Vijay Varma',
   'Anupam Kher', 'Boman Irani', 'Paresh Rawal',
    'Om Puri', 'Amrish Puri', 'Shammi Kapoor', 'Shashi Kapoor', 'Jeetendra',
    'Mithun Chakraborty', 'Govinda', 'Sanjay Kapoor',  'Sushant Singh Rajput', 'Vikrant Massey', 'Ali Fazal',  'Vikram', 'Suriya', 'Vijay', 'Allu Arjun',
    'Prabhas', 'Mahesh Babu', 'Jr NTR', 'Ram Charan', 'Dhanush',
    'Karthi', 'Sivakarthikeyan', 'Jayam Ravi', 'Ravi Teja', 'Nani',
    'Ravi Teja', 'Nani', 'Nagarjuna', 'Venkatesh', 'Chiranjeevi',
    'Kamal Haasan', 'Rajinikanth', 'Mammootty', 'Mohanlal', 'Dulquer Salmaan',
    'Fahadh Faasil', 'Tovino Thomas', 'Prithviraj Sukumaran', 'Nivin Pauly'
  ],

  // Bollywood Actors - Female (100)
  bollywoodActorsFemale: [
    'Deepika Padukone', 'Priyanka Chopra', 'Kareena Kapoor', 'Katrina Kaif', 'Alia Bhatt',
    'Anushka Sharma', 'Kangana Ranaut', 'Madhuri Dixit', 'Aishwarya Rai', 'Kajol',
    'Shraddha Kapoor', 'Sonam Kapoor', 'Sonakshi Sinha', 'Parineeti Chopra', 'Kiara Advani',
    'Sara Ali Khan', 'Janhvi Kapoor', 'Disha Patani', 'Tara Sutaria', 'Ananya Panday',
    'Nargis Fakhri', 'Amy Jackson', 'Jacqueline Fernandez', 'Nora Fatehi', 'Malaika Arora',
    'Karisma Kapoor', 'Raveena Tandon', 'Urmila Matondkar', 'Sonali Bendre', 'Manisha Koirala',
    'Tabu', 'Vidya Balan', 'Rani Mukerji', 'Preity Zinta',
    'Lara Dutta', 'Bipasha Basu', 'Esha Deol', 'Tara Sharma', 'Amrita Rao',
    'Genelia D\'Souza', 'Asin', 'Tamannaah', 'Ileana D\'Cruz', 'Shruti Haasan',
    'Nayanthara', 'Samantha Ruth Prabhu', 'Rashmika Mandanna', 'Pooja Hegde', 'Anushka Shetty',
    'Trisha', 'Tamannaah Bhatia', 'Kajal Aggarwal', 'Shriya Saran', 'Hansika Motwani',
    'Rakul Preet Singh', 'Yami Gautam', 'Bhumi Pednekar', 'Radhika Apte', 'Richa Chadda',
    'Tripti Dimri', 'Sanya Malhotra', 'Fatima Sana Shaikh', 'Zaira Wasim', 'Mrunal Thakur',
    'Kriti Sanon', 'Vaani Kapoor', 'Aditi Rao Hydari', 'Diana Penty',  'Mouni Roy', 'Nushrat Bharucha',  'Sobhita Dhulipala',
     'Sayani Gupta',  'Swara Bhasker', 'Kalki Koechlin', 
    'Mallika Sherawat',  'Neha Dhupia', 
    'Neha Sharma'
  ],

  // Cricketers (100)
  cricketers: [
    'Sachin Tendulkar', 'Virat Kohli', 'MS Dhoni', 'Rohit Sharma', 'Kapil Dev',
    'Sunil Gavaskar', 'Rahul Dravid', 'Sourav Ganguly', 'Anil Kumble', 'Virender Sehwag',
    'Yuvraj Singh', 'Harbhajan Singh', 'Ravichandran Ashwin', 'Jasprit Bumrah', 'Ravindra Jadeja',
    'Hardik Pandya', 'KL Rahul', 'Shikhar Dhawan', 'Rishabh Pant', 'Mohammed Shami',
    'Bhuvneshwar Kumar', 'Ishant Sharma', 'Umesh Yadav', 'Mohammed Siraj', 'Shardul Thakur',
    'Washington Sundar', 'Axar Patel', 'Yuzvendra Chahal', 'Kuldeep Yadav', 'Ravi Bishnoi',
    'Suryakumar Yadav', 'Ishan Kishan', 'Sanju Samson', 'Shreyas Iyer', 'Mayank Agarwal',
    'Cheteshwar Pujara', 'Ajinkya Rahane', 'Wriddhiman Saha', 'Dinesh Karthik', 'Gautam Gambhir',
    'VVS Laxman', 'Mohammad Azharuddin', 'Navjot Singh Sidhu', 'Ajay Jadeja', 'Zaheer Khan', 'Irfan Pathan', 'Yusuf Pathan',
    'Suresh Raina', 'Mohammad Kaif',
    'Ajit Agarkar', 'Ashish Nehra', 'Munaf Patel', 'S Sreesanth', 'RP Singh',
    'Praveen Kumar', 'Amit Mishra', 'Piyush Chawla', 'Rahul Chahar', 'Varun Chakravarthy',
     'Deepak Chahar', 'Navdeep Saini',
     'Avesh Khan', 'Prasidh Krishna', 'Arshdeep Singh',
    'Umran Malik', 'Tilak Varma', 'Ruturaj Gaikwad', 'Devdutt Padikkal',
    'Prithvi Shaw', 'Shubman Gill', 'Rinku Singh', 'Jitesh Sharma', 'Shivam Dube',
    'Venkatesh Iyer', 'Rahul Tripathi', 'Nitish Rana', 'Riyan Parag', 'Abhishek Sharma',
    'Yashasvi Jaiswal', 'Dhruv Jurel', 'Sarfaraz Khan', 'Akash Deep', 'Harshit Rana'
  ],

  // Politicians (100)
  politicians: [
    'Narendra Modi', 'Mahatma Gandhi', 'Jawaharlal Nehru', 'Indira Gandhi', 'Rajiv Gandhi',
    'Atal Bihari Vajpayee', 'Manmohan Singh', 'Dr. B.R. Ambedkar', 'Sardar Patel', 'Subhas Chandra Bose',
    'Lal Bahadur Shastri', 'P.V. Narasimha Rao', 'A.P.J. Abdul Kalam', 'Pranab Mukherjee', 'Ram Nath Kovind',
    'Droupadi Murmu', 'Rahul Gandhi', 'Sonia Gandhi', 'Priyanka Gandhi', 'Amit Shah',
    'Arvind Kejriwal', 'Mamata Banerjee', 'Naveen Patnaik', 'Yogi Adityanath', 'Shivraj Singh Chouhan',
    'Nitin Gadkari', 'Rajnath Singh', 'Sushma Swaraj', 'L.K. Advani', 'Manohar Joshi',
    'Sharad Pawar', 'Lalu Prasad Yadav', 'Nitish Kumar',
    'Mulayam Singh Yadav', 'Akhilesh Yadav', 'Mayawati', 'K. Chandrashekar Rao', 'Pinarayi Vijayan',
    'M.K. Stalin', 'Uddhav Thackeray', 'Devendra Fadnavis', 'Amarinder Singh', 'Bhupesh Baghel',
    'Hemant Soren', 'N. Biren Singh', 'Vijay Rupani',
    'Ashok Gehlot', 'Bhupendra Patel',
  'Siddaramaiah'
  ],

  // Businesspeople (100)
  businesspeople: [
    'Mukesh Ambani', 'Ratan Tata', 'Gautam Adani', 'Azim Premji', 'Lakshmi Mittal',
    'Shiv Nadar', 'Anil Ambani', 'Kumar Mangalam Birla', 'Narayana Murthy', 'Nandan Nilekani',
    'Vijay Shekhar Sharma', 'Bhavish Aggarwal', 'Ritesh Agarwal', 'Sachin Bansal', 'Binny Bansal',
    'Radhakishan Damani', 'Cyrus Poonawalla', 'Uday Kotak', 'Dilip Shanghvi', 'Sunil Mittal',
    'Kiran Mazumdar-Shaw', 'Rahul Bajaj', 'Anand Mahindra',
    'Adi Godrej',
    'Falguni Nayar', 'Indra Nooyi',
     'Sridhar Vembu', 'Kunal Shah', 'Nithin Kamath',
    
    'Raghuram Rajan',
    'Chanda Kochhar', 'Arundhati Bhattacharya',  'Cyrus Mistry', 'Rakesh Jhunjhunwala'
  ],

  // Singers/Musicians (100)
  singers: [
    'Lata Mangeshkar', 'Kishore Kumar', 'Mohammed Rafi', 'A.R. Rahman', 'Ilaiyaraaja',
    'Shreya Ghoshal', 'Sonu Nigam', 'Arijit Singh', 'Neha Kakkar', 'Badshah',
    'Diljit Dosanjh', 'Gurdas Maan', 'Papon', 'Sunidhi Chauhan', 'Udit Narayan',
    'Kumar Sanu', 'Alka Yagnik', 'Asha Bhosle',
    'Shankar Mahadevan', 'Usha Uthup',
    'K.S. Chithra', 'S.P. Balasubrahmanyam', 'P. Susheela', 'S. Janaki', 'K.J. Yesudas',
    'Hariharan', 'Shankar-Ehsaan-Loy', 'Amit Trivedi',
    'Mithoon', 'Pritam', 'Vishal Dadlani', 'Ankit Tiwari',
     'Guru Randhawa', 'Darshan Raval', 'Armaan Malik',
     'Jonita Gandhi', 'Neeti Mohan', 'Palak Muchhal', 'Jasleen Royal',
     'Yo Yo Honey Singh', 'Raftaar', 'Divine',
    'Naezy', 'Emiway Bantai', 'Raja Kumari', 'Ritviz', 
    'Nucleya',  'Parvaaz',
  ],

  // Directors (Top 35)
  directors: [
    'Rajkumar Hirani', 'Sanjay Leela Bhansali', 'Karan Johar', 'Rohit Shetty', 'Aamir Khan',
    'Anurag Kashyap', 'Vishal Bhardwaj', 'Imtiaz Ali', 'Zoya Akhtar', 'Farhan Akhtar',
    'S.S. Rajamouli', 'Mani Ratnam', 'Shankar', 'A.R. Murugadoss', 'Atlee',
    'Satyajit Ray', 'Raj Kapoor', 'Yash Chopra', 'Rakesh Roshan', 'Priyadarshan', 
    'Farah Khan', 'Kabir Khan', 'Nitesh Tiwari'
  ],

  // Athletes (60 - Non-Cricket)
  athletes: [
    // Badminton
    'PV Sindhu', 'Saina Nehwal', 'Kidambi Srikanth', 'Lakshya Sen', 'Ashwini Ponnappa', 'Jwala Gutta', 'Prakash Padukone',
    
    // Tennis
    'Sania Mirza', 'Leander Paes', 'Mahesh Bhupathi', 'Rohan Bopanna',
    
    // Shooting
    'Abhinav Bindra', 'Rajyavardhan Singh Rathore', 'Gagan Narang', 'Manu Bhaker',
    
    // Boxing
    'Vijender Singh', 'Mary Kom', 'Nikhat Zareen', 'Amit Panghal',
    
    // Wrestling
    'Bajrang Punia', 'Deepak Punia','Sakshi Malik', 'Vinesh Phogat',
    'Geeta Phogat', 'Babita Phogat',
    
    // Athletics/Track & Field
    'Neeraj Chopra', 'Hima Das', 'Anju Bobby George', 'PT Usha',
    'Milkha Singh',
    
    // Chess
    'Vishwanathan Anand', 'D Gukesh', 'R Praggnanandhaa', 'Vidit Gujrathi',
    
    // Football
    'Sunil Chhetri', 'Bhaichung Bhutia',
    
    // Hockey
    'Dhyan Chand',
    
    // Weightlifting
    'Mirabai Chanu', 'Karnam Malleswari',
    
    // Gymnastics
    'Dipa Karmakar',
  ],

  // Writers (Top 35)
  writers: [
    'Rabindranath Tagore', 'Ruskin Bond', 'Arundhati Roy', 'Chetan Bhagat', 'Amish Tripathi',
    'Gulzar', 'Javed Akhtar', 'Mirza Ghalib', 'Kalidasa', 'Premchand',
    'R.K. Narayan', 'Mulk Raj Anand', 'Khushwant Singh', 'Vikram Seth',
    'Salman Rushdie', 'Shashi Tharoor',
     'Ramachandra Guha',
  ],

  // Models (100)
  models: [
    'Aishwarya Rai', 'Priyanka Chopra', 'Lara Dutta', 'Diana Penty', 'Nargis Fakhri',
    'Amy Jackson', 'Jacqueline Fernandez', 'Nora Fatehi', 'Malaika Arora', 'Karisma Kapoor',
    'Raveena Tandon', 'Urmila Matondkar', 'Sonali Bendre', 'Manisha Koirala', 'Tabu',
    'Vidya Balan',  'Rani Mukerji', 'Preity Zinta', 'Bipasha Basu',
    'Esha Deol', 'Tara Sharma'
  ],

  // Scientists (Top 35)
  scientists: [
    'Srinivasa Ramanujan', 'Jagadish Chandra Bose', 'Homi J. Bhabha', 'Vikram Sarabhai',
    'A.P.J. Abdul Kalam',  'C.V. Raman', 
    'Subrahmanyan Chandrasekhar',
    'Salim Ali',
    'Nambi Narayanan', 'Kalpana Chawla'
  ],

  // Freedom Fighters (Top 35)
  freedomFighters: [
    'Mahatma Gandhi', 'Bhagat Singh', 'Chandrashekhar Azad', 'Subhas Chandra Bose', 'Sardar Vallabhbhai Patel',
    'Jawaharlal Nehru', 'Bal Gangadhar Tilak', 'Lala Lajpat Rai', 'Sarojini Naidu', 'Annie Besant',
    'Maulana Abul Kalam Azad', 'Rajendra Prasad', 'C. Rajagopalachari', 'B.R. Ambedkar',
    'Rani Lakshmibai', 'Kasturba Gandhi'
  ],

  // YouTubers (Top 35)
  youtubers: [
    'CarryMinati', 'Technical Guruji', 'BB Ki Vines', 'Sandeep Maheshwari', 'Prajakta Koli',
    'Komal Pandey', 'Ranveer Allahbadia', 'Dhruv Rathee', 'Flying Beast',
    'Ashish Chanchlani', 'Harsh Beniwal', 'Amit Bhadana', 'Mumbiker Nikhil',
    'Gaurav Taneja', 'Dhruv Rathee',
    'Mohak Mangal', 'Ankur Warikoo',
    'Raj Shamani', 'Tanmay Bhat', 'Rohan Joshi', 'Biswa Kalyan Rath',
    'Zakir Khan', 'Samay Raina', 'Harsh Gujral', 'Anubhav Singh Bassi', 'Munawar Faruqui',
  ],

  // Comedians (100)
  comedians: [
    'Kapil Sharma', 'Johnny Lever', 'Rajpal Yadav', 'Paresh Rawal', 'Boman Irani',
    'Anupam Kher', 'Riteish Deshmukh', 'Arshad Warsi', 'Vivek Oberoi', 
    'Imran Khan', 'Ranvir Shorey',
    'Kay Kay Menon', 'Manoj Bajpayee', 'Sanjay Dutt', 'Sunil Shetty', 'Akshay Khanna',
    'Randeep Hooda', 'Rajkummar Rao','Vijay Varma',
    'Anupam Kher', 'Boman Irani',
    'Paresh Rawal', 'Om Puri', 'Amrish Puri', 'Shammi Kapoor', 'Shashi Kapoor',
    'Jeetendra', 'Mithun Chakraborty', 'Govinda', 'Sanjay Kapoor', 'Bobby Deol',
    'Vir Das', 'Biswa Kalyan Rath', 'Kanan Gill', 'Kenny Sebastian', 'Abish Mathew',
    'Zakir Khan', 'Atul Khatri', 'Sorabh Pant', 'Rohan Joshi', 'Tanmay Bhat',
    'Gursimran Khamba', 'Ashish Shakya', 'Rahul Subramanian', 'Amit Tandon', 'Abhishek Upmanyu',
    'Anubhav Singh Bassi', 'Munawar Faruqui', 'Samay Raina', 'Rahul Dua', 'Aakash Gupta',
    'Varun Thakur', 'Aadar Malik', 'Urooj Ashfaq', 'Shreeja Chaturvedi', 'Sumukhi Suresh',
    'Kaneez Surka', 'Neeti Palta',
    'Supriya Joshi', 'Mallika Dua',
  ],

  // Foreign Actors (Top 20)
  foreignActors: [
    'Tom Hanks', 'Leonardo DiCaprio', 'Brad Pitt', 'Robert Downey Jr', 'Johnny Depp',
    'Will Smith', 'Tom Cruise', 'Denzel Washington', 'Morgan Freeman', 'Samuel L. Jackson',
     'Matt Damon', 'Ryan Reynolds', 'Chris Evans', 'Chris Hemsworth',
     'Dwayne Johnson',
  ],

  // Foreign Actresses (Top 20)
  foreignActresses: [
     'Scarlett Johansson', 'Jennifer Lawrence', 'Angelina Jolie', 'Emma Watson',
    'Natalie Portman', 'Anne Hathaway',  'Gal Gadot', 'Margot Robbie',
    'Zendaya'
  ],

  // Foreign Musicians/Singers (Top 20)
  foreignMusicians: [
    'Michael Jackson', 'Madonna', 'Taylor Swift',
    'Beyoncé', 'Adele', 'Ed Sheeran', 'Justin Bieber', 'Ariana Grande',
    'Billie Eilish', 'Drake', 'Eminem', 'Rihanna', 'Lady Gaga',
    'Bruno Mars', 'Dua Lipa',
  ],

  // Foreign Athletes (Top 20)
  foreignAthletes: [
    'Lionel Messi', 'Cristiano Ronaldo', 'LeBron James', 'Michael Jordan', 'Serena Williams',
    'Roger Federer', 'Rafael Nadal', 'Usain Bolt', 'Tiger Woods',
    'Kobe Bryant', 'Muhammad Ali', 'Pele', 'Diego Maradona', 'Lewis Hamilton',
    'Novak Djokovic', 'Stephen Curry', 'Kylian Mbappé', 'Simone Biles',
  ],

  // Foreign Scientists (Top 20)
  foreignScientists: [
    'Albert Einstein', 'Isaac Newton', 'Charles Darwin', 'Marie Curie', 'Stephen Hawking',
    'Nikola Tesla', 'Galileo Galilei', 'Leonardo da Vinci', 'Thomas Edison', 'Alexander Graham Bell',
     'James Watson',  'Rosalind Franklin',
    'Niels Bohr', 'Erwin Schrödinger',
  ],

  // Foreign Politicians/Leaders (Top 20)
  foreignPoliticians: [
    'Barack Obama', 'Donald Trump', 'Joe Biden', 'Winston Churchill', 'Nelson Mandela',
    'Abraham Lincoln', 'George Washington', 'Franklin D. Roosevelt', 'John F. Kennedy', 'Martin Luther King Jr',
    'Mahatma Gandhi', 'Vladimir Putin', 'Xi Jinping', 'Angela Merkel', 'Emmanuel Macron',
    'Justin Trudeau', 'Volodymyr Zelensky', 'Boris Johnson',
  ],

  // Foreign Businesspeople (Top 20)
  foreignBusinesspeople: [
    'Elon Musk', 'Bill Gates', 'Warren Buffett', 'Jeff Bezos', 'Steve Jobs',
    'Mark Zuckerberg', 'Tim Cook', 'Larry Page', 'Sergey Brin', 'Larry Ellison',
    'Oprah Winfrey', 'Jack Ma'
  ],

  // Foreign Directors (Top 20)
  foreignDirectors: [
    'Steven Spielberg', 'Christopher Nolan', 'Martin Scorsese', 'Quentin Tarantino', 'James Cameron',
     'Alfred Hitchcock',
     'Russo Brothers', 
  ],

  // Foreign Writers (Top 20)
  foreignWriters: [
    'William Shakespeare', 'J.K. Rowling', 'Agatha Christie',
     'Charles Dickens', 'Mark Twain', 
    'George Orwell'
  ],
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Select evenly distributed personalities from each category
const selectEvenlyDistributed = (count: number = 100): string[] => {
  const categories = Object.keys(INDIAN_PERSONALITIES_BY_CATEGORY);
  const perCategory = Math.floor(count / categories.length);
  const remainder = count % categories.length;
  
  // First, deduplicate all category lists
  const deduplicatedCategories: Record<string, string[]> = {};
  categories.forEach((category) => {
    const categoryList = INDIAN_PERSONALITIES_BY_CATEGORY[category];
    deduplicatedCategories[category] = Array.from(new Set(categoryList));
  });
  
  const selected: string[] = [];
  const usedNames = new Set<string>();
  
  // First pass: try to get evenly distributed selection
  categories.forEach((category, index) => {
    const uniqueList = deduplicatedCategories[category];
    const shuffled = shuffleArray([...uniqueList]);
    const takeCount = perCategory + (index < remainder ? 1 : 0);
    
    let taken = 0;
    for (const name of shuffled) {
      if (taken >= takeCount) break;
      if (!usedNames.has(name)) {
        selected.push(name);
        usedNames.add(name);
        taken++;
      }
    }
  });
  
  // If we don't have enough, fill from remaining categories
  if (selected.length < count) {
    const needed = count - selected.length;
    let filled = 0;
    
    // Shuffle categories and try to fill from each
    const shuffledCategories = shuffleArray([...categories]);
    for (const category of shuffledCategories) {
      if (filled >= needed) break;
      const uniqueList = deduplicatedCategories[category];
      const shuffled = shuffleArray([...uniqueList]);
      
      for (const name of shuffled) {
        if (filled >= needed) break;
        if (!usedNames.has(name)) {
          selected.push(name);
          usedNames.add(name);
          filled++;
        }
      }
    }
  }
  
  // Shuffle final selection and ensure exactly count items
  return shuffleArray(selected).slice(0, count);
};

export const fetchFamousPersonalities = async (count: number = 100): Promise<Personality[]> => {
  // Use static list and select evenly from categories
  const selected = selectEvenlyDistributed(count);
  
  return selected.map((name, index) => ({
    id: `personality-${index}`,
    name: name,
  }));
};

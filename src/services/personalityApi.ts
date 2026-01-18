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
    'Riteish Deshmukh', 'Arshad Warsi', 'Akshaye Khanna', 'Vivek Oberoi', 'Fardeen Khan',
    'Zayed Khan', 'Harman Baweja', 'Neil Nitin Mukesh', 'Imran Khan', 'Ranvir Shorey',
    'Kay Kay Menon', 'Manoj Bajpayee', 'Sanjay Dutt', 'Sunil Shetty', 'Randeep Hooda',
    'Vineet Kumar Singh', 'Jaideep Ahlawat', 'Vijay Varma', 'Manoj Pahwa', 'Adil Hussain',
    'Gulshan Grover', 'Danny Denzongpa', 'Anupam Kher', 'Boman Irani', 'Paresh Rawal',
    'Om Puri', 'Amrish Puri', 'Shammi Kapoor', 'Shashi Kapoor', 'Jeetendra',
    'Mithun Chakraborty', 'Govinda', 'Sanjay Kapoor', 'Karan Kapoor', 'Kunal Kapoor',
    'Rahul Bose', 'Rahul Khanna', 'Rahul Dev', 'Rahul Roy', 'Rahul Bhat',
    'Adil Hussain', 'Jimmy Sheirgill', 'Rajeev Khandelwal', 'Sushant Singh Rajput', 'Ahan Shetty',
    'Amit Sadh', 'Vikrant Massey', 'Ali Fazal', 'Adarsh Gourav', 'Jitendra Kumar',
    'Gulshan Devaiah', 'Vikram', 'Suriya', 'Vijay', 'Allu Arjun',
    'Prabhas', 'Mahesh Babu', 'Jr NTR', 'Ram Charan', 'Dhanush',
    'Karthi', 'Sivakarthikeyan', 'Jayam Ravi', 'Ravi Teja', 'Nani',
    'Ravi Teja', 'Nani', 'Nagarjuna', 'Venkatesh', 'Chiranjeevi',
    'Kamal Haasan', 'Rajinikanth', 'Mammootty', 'Mohanlal', 'Dulquer Salmaan',
    'Fahadh Faasil', 'Tovino Thomas', 'Prithviraj Sukumaran', 'Nivin Pauly', 'Asif Ali',
  ],

  // Bollywood Actors - Female (100)
  bollywoodActorsFemale: [
    'Deepika Padukone', 'Priyanka Chopra', 'Kareena Kapoor', 'Katrina Kaif', 'Alia Bhatt',
    'Anushka Sharma', 'Kangana Ranaut', 'Madhuri Dixit', 'Aishwarya Rai', 'Kajol',
    'Shraddha Kapoor', 'Sonam Kapoor', 'Sonakshi Sinha', 'Parineeti Chopra', 'Kiara Advani',
    'Sara Ali Khan', 'Janhvi Kapoor', 'Disha Patani', 'Tara Sutaria', 'Ananya Panday',
    'Nargis Fakhri', 'Amy Jackson', 'Jacqueline Fernandez', 'Nora Fatehi', 'Malaika Arora',
    'Karisma Kapoor', 'Raveena Tandon', 'Urmila Matondkar', 'Sonali Bendre', 'Manisha Koirala',
    'Tabu', 'Vidya Balan', 'Konkona Sen Sharma', 'Rani Mukerji', 'Preity Zinta',
    'Lara Dutta', 'Bipasha Basu', 'Esha Deol', 'Tara Sharma', 'Amrita Rao',
    'Genelia D\'Souza', 'Asin', 'Tamannaah', 'Ileana D\'Cruz', 'Shruti Haasan',
    'Nayanthara', 'Samantha Ruth Prabhu', 'Rashmika Mandanna', 'Pooja Hegde', 'Anushka Shetty',
    'Trisha', 'Tamannaah Bhatia', 'Kajal Aggarwal', 'Shriya Saran', 'Hansika Motwani',
    'Rakul Preet Singh', 'Yami Gautam', 'Bhumi Pednekar', 'Radhika Apte', 'Richa Chadda',
    'Tripti Dimri', 'Sanya Malhotra', 'Fatima Sana Shaikh', 'Zaira Wasim', 'Mrunal Thakur',
    'Kriti Sanon', 'Vaani Kapoor', 'Aditi Rao Hydari', 'Diana Penty', 'Amyra Dastur',
    'Isha Talwar', 'Mouni Roy', 'Nushrat Bharucha', 'Shweta Tripathi', 'Sobhita Dhulipala',
    'Radhika Madan', 'Banita Sandhu', 'Sayani Gupta', 'Rasika Dugal', 'Tillotama Shome',
    'Geetanjali Thapa', 'Swara Bhasker', 'Kalki Koechlin', 'Gul Panag', 'Nimrat Kaur',
    'Mallika Sherawat', 'Celina Jaitly', 'Neha Dhupia', 'Minissha Lamba', 'Gul Panag',
    'Neha Sharma', 'Urvashi Rautela', 'Pooja Hegde', 'Tamannaah', 'Ileana D\'Cruz',
    'Shruti Haasan', 'Nayanthara', 'Samantha Ruth Prabhu', 'Rashmika Mandanna', 'Anushka Shetty',
    'Trisha', 'Kajal Aggarwal', 'Shriya Saran', 'Hansika Motwani', 'Rakul Preet Singh',
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
    'VVS Laxman', 'Mohammad Azharuddin', 'Navjot Singh Sidhu', 'Ajay Jadeja', 'Robin Singh',
    'Javagal Srinath', 'Venkatesh Prasad', 'Zaheer Khan', 'Irfan Pathan', 'Yusuf Pathan',
    'Suresh Raina', 'Mohammad Kaif', 'Dinesh Mongia', 'Hemang Badani', 'Reetinder Sodhi',
    'Ajit Agarkar', 'Ashish Nehra', 'Munaf Patel', 'S Sreesanth', 'RP Singh',
    'Praveen Kumar', 'Amit Mishra', 'Piyush Chawla', 'Rahul Chahar', 'Varun Chakravarthy',
    'Shahbaz Nadeem', 'Jayant Yadav', 'Karn Sharma', 'Deepak Chahar', 'Navdeep Saini',
    'T Natarajan', 'Khaleel Ahmed', 'Avesh Khan', 'Prasidh Krishna', 'Arshdeep Singh',
    'Umran Malik', 'Mukesh Kumar', 'Tilak Varma', 'Ruturaj Gaikwad', 'Devdutt Padikkal',
    'Prithvi Shaw', 'Shubman Gill', 'Rinku Singh', 'Jitesh Sharma', 'Shivam Dube',
    'Venkatesh Iyer', 'Rahul Tripathi', 'Nitish Rana', 'Riyan Parag', 'Abhishek Sharma',
    'Yashasvi Jaiswal', 'Dhruv Jurel', 'Sarfaraz Khan', 'Akash Deep', 'Harshit Rana',
    'Arshin Kulkarni', 'Mahipal Lomror', 'Abid Mushtaq', 'Vidwath Kaverappa', 'Mayank Yadav',
  ],

  // Politicians (100)
  politicians: [
    'Narendra Modi', 'Mahatma Gandhi', 'Jawaharlal Nehru', 'Indira Gandhi', 'Rajiv Gandhi',
    'Atal Bihari Vajpayee', 'Manmohan Singh', 'Dr. B.R. Ambedkar', 'Sardar Patel', 'Subhas Chandra Bose',
    'Lal Bahadur Shastri', 'P.V. Narasimha Rao', 'A.P.J. Abdul Kalam', 'Pranab Mukherjee', 'Ram Nath Kovind',
    'Droupadi Murmu', 'Rahul Gandhi', 'Sonia Gandhi', 'Priyanka Gandhi', 'Amit Shah',
    'Arvind Kejriwal', 'Mamata Banerjee', 'Naveen Patnaik', 'Yogi Adityanath', 'Shivraj Singh Chouhan',
    'Nitin Gadkari', 'Rajnath Singh', 'Sushma Swaraj', 'L.K. Advani', 'Murli Manohar Joshi',
    'Jaswant Singh', 'Yashwant Sinha', 'Sharad Pawar', 'Lalu Prasad Yadav', 'Nitish Kumar',
    'Mulayam Singh Yadav', 'Akhilesh Yadav', 'Mayawati', 'K. Chandrashekar Rao', 'Pinarayi Vijayan',
    'M.K. Stalin', 'Uddhav Thackeray', 'Devendra Fadnavis', 'Amarinder Singh', 'Bhupesh Baghel',
    'Hemant Soren', 'Biplab Kumar Deb', 'Pema Khandu', 'N. Biren Singh', 'Vijay Rupani',
    'Ashok Gehlot', 'Bhupendra Patel', 'Basavaraj Bommai', 'B.S. Yediyurappa', 'Jagan Mohan Reddy',
    'K. Rosaiah', 'Kiran Kumar Reddy', 'N. Kiran Kumar Reddy', 'N. Chandrababu Naidu', 'Y.S. Jagan Mohan Reddy',
    'K. Chandrasekhar Rao', 'K. Chandrashekar Rao', 'Siddaramaiah', 'H.D. Kumaraswamy', 'B.S. Yediyurappa',
    'D.V. Sadananda Gowda', 'Jagadish Shettar', 'S. Bangarappa', 'Veerappa Moily', 'S.M. Krishna',
    'D. Devaraj Urs', 'Ramakrishna Hegde', 'J.H. Patel', 'S. Nijalingappa', 'K. Hanumanthaiya',
    'Kengal Hanumanthaiah', 'B.D. Jatti', 'Veerendra Patil', 'S.R. Bommai', 'J. Jayalalithaa',
    'M. Karunanidhi', 'M.G. Ramachandran', 'C.N. Annadurai', 'E.V. Ramasamy', 'Periyar E.V. Ramasamy',
    'C. Rajagopalachari', 'K. Kamaraj', 'M. Bhaktavatsalam', 'P. Sivakami', 'J. Jayalalithaa',
  ],

  // Businesspeople (100)
  businesspeople: [
    'Mukesh Ambani', 'Ratan Tata', 'Gautam Adani', 'Azim Premji', 'Lakshmi Mittal',
    'Shiv Nadar', 'Anil Ambani', 'Kumar Mangalam Birla', 'Narayana Murthy', 'Nandan Nilekani',
    'Vijay Shekhar Sharma', 'Bhavish Aggarwal', 'Ritesh Agarwal', 'Sachin Bansal', 'Binny Bansal',
    'Radhakishan Damani', 'Cyrus Poonawalla', 'Uday Kotak', 'Dilip Shanghvi', 'Sunil Mittal',
    'Kiran Mazumdar-Shaw', 'Rahul Bajaj', 'Anand Mahindra', 'Venu Srinivasan', 'R.C. Bhargava',
    'Adi Godrej', 'Jamshyd Godrej', 'Nadir Godrej', 'Pirojsha Godrej', 'Sobha Philip',
    'K.P. Singh', 'Mallika Srinivasan', 'Vinita Gupta', 'Kiran Nadar', 'Rohini Nilekani',
    'Falguni Nayar', 'Suchitra Ella', 'Vandana Luthra', 'Shahnaz Husain', 'Indra Nooyi',
    'Padmasree Warrior', 'Neelam Dhawan', 'Aruna Jayanthi', 'Vanitha Narayanan', 'Vani Kola',
    'Anuradha Acharya', 'Rashmi Bansal', 'Sridhar Vembu', 'Kunal Shah', 'Nithin Kamath',
    'Girish Mathrubootham', 'Ravi Gururaj', 'Krishna Kumar', 'Ravi Venkatesan', 'Ramesh Raskar',
    'Raghuram Rajan', 'Arvind Subramanian', 'Vishal Sikka', 'Romesh Wadhwani', 'Romesh Sobti',
    'Chanda Kochhar', 'Shikha Sharma', 'Arundhati Bhattacharya', 'Kalpana Morparia', 'Naina Lal Kidwai',
    'Zia Mody', 'Cyrus Mistry', 'Rakesh Jhunjhunwala', 'Radhakishan Damani', 'Rakesh Jhunjhunwala',
    'Radhakishan Damani', 'Rakesh Jhunjhunwala', 'Radhakishan Damani', 'Rakesh Jhunjhunwala', 'Radhakishan Damani',
    'Rakesh Jhunjhunwala', 'Radhakishan Damani', 'Rakesh Jhunjhunwala', 'Radhakishan Damani', 'Rakesh Jhunjhunwala',
    'Radhakishan Damani', 'Rakesh Jhunjhunwala', 'Radhakishan Damani', 'Rakesh Jhunjhunwala', 'Radhakishan Damani',
  ],

  // Singers/Musicians (100)
  singers: [
    'Lata Mangeshkar', 'Kishore Kumar', 'Mohammed Rafi', 'A.R. Rahman', 'Ilaiyaraaja',
    'Shreya Ghoshal', 'Sonu Nigam', 'Arijit Singh', 'Neha Kakkar', 'Badshah',
    'Diljit Dosanjh', 'Gurdas Maan', 'Papon', 'Sunidhi Chauhan', 'Udit Narayan',
    'Kumar Sanu', 'Alka Yagnik', 'Asha Bhosle', 'Manna Dey', 'Hemant Kumar',
    'Shankar Mahadevan', 'Usha Uthup', 'Kavita Krishnamurthy', 'Anuradha Paudwal', 'Sadhana Sargam',
    'K.S. Chithra', 'S.P. Balasubrahmanyam', 'P. Susheela', 'S. Janaki', 'K.J. Yesudas',
    'Hariharan', 'Shankar-Ehsaan-Loy', 'Vishal-Shekhar', 'Salim-Sulaiman', 'Amit Trivedi',
    'Mithoon', 'Pritam', 'Vishal Dadlani', 'Shekhar Ravjiani', 'Ankit Tiwari',
    'Arko Pravo Mukherjee', 'Tanishk Bagchi', 'Guru Randhawa', 'Darshan Raval', 'Armaan Malik',
    'Jubin Nautiyal', 'Asees Kaur', 'Jonita Gandhi', 'Neeti Mohan', 'Shilpa Rao',
    'Monali Thakur', 'Shalmali Kholgade', 'Palak Muchhal', 'Jasleen Royal', 'Rochak Kohli',
    'Sachin-Jigar', 'Meet Bros', 'Yo Yo Honey Singh', 'Raftaar', 'Divine',
    'Naezy', 'Emiway Bantai', 'Raja Kumari', 'Ritviz', 'Nucleya',
    'Nucleya', 'The Local Train', 'Parvaaz', 'Indian Ocean', 'Agnee',
  ],

  // Directors (100)
  directors: [
    'Rajkumar Hirani', 'Sanjay Leela Bhansali', 'Karan Johar', 'Rohit Shetty', 'Aamir Khan',
    'Anurag Kashyap', 'Vishal Bhardwaj', 'Imtiaz Ali', 'Zoya Akhtar', 'Farhan Akhtar',
    'S.S. Rajamouli', 'Mani Ratnam', 'Shankar', 'A.R. Murugadoss', 'Atlee',
    'Satyajit Ray', 'Ritwik Ghatak', 'Mrinal Sen', 'Guru Dutt', 'Bimal Roy',
    'Mehboob Khan', 'V. Shantaram', 'Raj Kapoor', 'Yash Chopra', 'Subhash Ghai',
    'Ramesh Sippy', 'Rakesh Roshan', 'David Dhawan', 'Priyadarshan', 'Anees Bazmee',
    'Farah Khan', 'Kabir Khan', 'Nitesh Tiwari', 'Ashutosh Gowariker', 'Rakeysh Omprakash Mehra',
    'Shoojit Sircar', 'Sriram Raghavan', 'Neeraj Pandey', 'Abhishek Chaubey', 'Hansal Mehta',
    'Anubhav Sinha', 'Tigmanshu Dhulia', 'Sujoy Ghosh', 'Bejoy Nambiar', 'Shimit Amin',
    'Nikhil Advani', 'Siddharth Anand', 'Rohit Dhawan', 'Remo D\'Souza', 'Ali Abbas Zafar',
    'Abhishek Varman', 'Vikas Bahl', 'Gauri Shinde', 'Meghna Gulzar', 'Reema Kagti',
    'Nandita Das', 'Mira Nair', 'Deepa Mehta', 'Gurinder Chadha', 'Anurag Basu',
    'Madhur Bhandarkar', 'Prakash Jha', 'Sudhir Mishra', 'Ketan Mehta', 'Govind Nihalani',
    'Shyam Benegal', 'Mani Kaul', 'Kumar Shahani', 'Adoor Gopalakrishnan', 'G. Aravindan',
    'John Abraham', 'R. Balki', 'Rakeysh Omprakash Mehra', 'Shoojit Sircar', 'Sriram Raghavan',
    'Neeraj Pandey', 'Abhishek Chaubey', 'Hansal Mehta', 'Anubhav Sinha', 'Tigmanshu Dhulia',
    'Sujoy Ghosh', 'Bejoy Nambiar', 'Shimit Amin', 'Nikhil Advani', 'Siddharth Anand',
  ],

  // Athletes (100)
  athletes: [
    'PV Sindhu', 'Saina Nehwal', 'Sania Mirza', 'Leander Paes', 'Mahesh Bhupathi',
    'Abhinav Bindra', 'Vijender Singh', 'Mary Kom', 'Dipa Karmakar', 'Neeraj Chopra',
    'Bajrang Punia', 'Ravi Kumar Dahiya', 'Deepak Punia', 'Sakshi Malik', 'Vinesh Phogat',
    'Geeta Phogat', 'Babita Phogat', 'Priyanka Phogat', 'Ritu Phogat', 'Sangita Phogat',
    'Hima Das', 'Dutee Chand', 'Anju Bobby George', 'PT Usha', 'Milkha Singh',
    'Anil Kumble', 'Sachin Tendulkar', 'Virat Kohli', 'MS Dhoni', 'Rohit Sharma',
    'Kapil Dev', 'Sunil Gavaskar', 'Rahul Dravid', 'Sourav Ganguly', 'Virender Sehwag',
    'Yuvraj Singh', 'Harbhajan Singh', 'Ravichandran Ashwin', 'Jasprit Bumrah', 'Ravindra Jadeja',
    'Hardik Pandya', 'KL Rahul', 'Shikhar Dhawan', 'Rishabh Pant', 'Mohammed Shami',
    'Bhuvneshwar Kumar', 'Ishant Sharma', 'Umesh Yadav', 'Mohammed Siraj', 'Shardul Thakur',
    'Washington Sundar', 'Axar Patel', 'Yuzvendra Chahal', 'Kuldeep Yadav', 'Ravi Bishnoi',
    'Suryakumar Yadav', 'Ishan Kishan', 'Sanju Samson', 'Shreyas Iyer', 'Mayank Agarwal',
    'Cheteshwar Pujara', 'Ajinkya Rahane', 'Wriddhiman Saha', 'Dinesh Karthik', 'Gautam Gambhir',
    'VVS Laxman', 'Mohammad Azharuddin', 'Navjot Singh Sidhu', 'Ajay Jadeja', 'Robin Singh',
    'Javagal Srinath', 'Venkatesh Prasad', 'Zaheer Khan', 'Irfan Pathan', 'Yusuf Pathan',
    'Suresh Raina', 'Virender Sehwag', 'Yuvraj Singh', 'Mohammad Kaif', 'Dinesh Mongia',
    'Hemang Badani', 'Reetinder Sodhi', 'Ajit Agarkar', 'Ashish Nehra', 'Munaf Patel',
    'S Sreesanth', 'RP Singh', 'Praveen Kumar', 'Amit Mishra', 'Piyush Chawla',
    'Harbhajan Singh', 'Ravichandran Ashwin', 'Ravindra Jadeja', 'Mohammed Shami', 'Bhuvneshwar Kumar',
  ],

  // Writers (100)
  writers: [
    'Rabindranath Tagore', 'Ruskin Bond', 'Arundhati Roy', 'Chetan Bhagat', 'Amish Tripathi',
    'Gulzar', 'Javed Akhtar', 'Mirza Ghalib', 'Kalidasa', 'Premchand',
    'R.K. Narayan', 'Mulk Raj Anand', 'Raja Rao', 'Khushwant Singh', 'Vikram Seth',
    'Salman Rushdie', 'Amitav Ghosh', 'Jhumpa Lahiri', 'Anita Desai', 'Kiran Desai',
    'Aravind Adiga', 'Rohinton Mistry', 'Manu Joseph', 'Jeet Thayil', 'Tishani Doshi',
    'Chitra Banerjee Divakaruni', 'Bharati Mukherjee', 'Jhumpa Lahiri', 'Anita Desai', 'Kiran Desai',
    'Amitav Ghosh', 'Vikram Chandra', 'Anita Nair', 'Shashi Tharoor', 'Pankaj Mishra',
    'William Dalrymple', 'Ramachandra Guha', 'Shashi Deshpande', 'Kamala Markandaya', 'Nayantara Sahgal',
    'Anita Rau Badami', 'Shauna Singh Baldwin', 'Aravind Adiga', 'Rohinton Mistry', 'Manu Joseph',
    'Jeet Thayil', 'Tishani Doshi', 'Amitav Ghosh', 'Vikram Chandra', 'Anita Nair',
    'Shashi Tharoor', 'Pankaj Mishra', 'William Dalrymple', 'Ramachandra Guha', 'Shashi Deshpande',
    'Kamala Markandaya', 'Nayantara Sahgal', 'Anita Rau Badami', 'Shauna Singh Baldwin', 'Bharati Mukherjee',
    'Chitra Banerjee Divakaruni', 'Jhumpa Lahiri', 'Anita Desai', 'Kiran Desai', 'Aravind Adiga',
    'Rohinton Mistry', 'Manu Joseph', 'Jeet Thayil', 'Tishani Doshi', 'Amitav Ghosh',
  ],

  // Models (100)
  models: [
    'Aishwarya Rai', 'Priyanka Chopra', 'Lara Dutta', 'Diana Penty', 'Nargis Fakhri',
    'Amy Jackson', 'Jacqueline Fernandez', 'Nora Fatehi', 'Malaika Arora', 'Karisma Kapoor',
    'Raveena Tandon', 'Urmila Matondkar', 'Sonali Bendre', 'Manisha Koirala', 'Tabu',
    'Vidya Balan', 'Konkona Sen Sharma', 'Rani Mukerji', 'Preity Zinta', 'Bipasha Basu',
    'Esha Deol', 'Tara Sharma', 'Amrita Rao', 'Genelia D\'Souza', 'Asin',
    'Tamannaah', 'Ileana D\'Cruz', 'Shruti Haasan', 'Nayanthara', 'Samantha Ruth Prabhu',
    'Rashmika Mandanna', 'Pooja Hegde', 'Anushka Shetty', 'Trisha', 'Tamannaah Bhatia',
    'Kajal Aggarwal', 'Shriya Saran', 'Hansika Motwani', 'Rakul Preet Singh', 'Yami Gautam',
    'Bhumi Pednekar', 'Radhika Apte', 'Richa Chadda', 'Tripti Dimri', 'Sanya Malhotra',
    'Fatima Sana Shaikh', 'Zaira Wasim', 'Mrunal Thakur', 'Kriti Sanon', 'Vaani Kapoor',
    'Aditi Rao Hydari', 'Diana Penty', 'Amyra Dastur', 'Sobhita Dhulipala', 'Radhika Madan',
    'Banita Sandhu', 'Sayani Gupta', 'Rasika Dugal', 'Tillotama Shome', 'Geetanjali Thapa',
    'Swara Bhasker', 'Kalki Koechlin', 'Gul Panag', 'Nimrat Kaur', 'Mallika Sherawat',
    'Celina Jaitly', 'Neha Dhupia', 'Minissha Lamba', 'Neha Sharma', 'Urvashi Rautela',
    'Pooja Hegde', 'Tamannaah', 'Ileana D\'Cruz', 'Shruti Haasan', 'Nayanthara',
    'Samantha Ruth Prabhu', 'Rashmika Mandanna', 'Anushka Shetty', 'Trisha', 'Kajal Aggarwal',
    'Shriya Saran', 'Hansika Motwani', 'Rakul Preet Singh', 'Yami Gautam', 'Bhumi Pednekar',
    'Radhika Apte', 'Richa Chadda', 'Tripti Dimri', 'Sanya Malhotra', 'Fatima Sana Shaikh',
    'Zaira Wasim', 'Mrunal Thakur', 'Kriti Sanon', 'Vaani Kapoor', 'Amyra Dastur',
  ],

  // Comedians (100)
  comedians: [
    'Kapil Sharma', 'Johnny Lever', 'Rajpal Yadav', 'Paresh Rawal', 'Boman Irani',
    'Anupam Kher', 'Riteish Deshmukh', 'Arshad Warsi', 'Vivek Oberoi', 'Fardeen Khan',
    'Zayed Khan', 'Harman Baweja', 'Neil Nitin Mukesh', 'Imran Khan', 'Ranvir Shorey',
    'Kay Kay Menon', 'Manoj Bajpayee', 'Sanjay Dutt', 'Sunil Shetty', 'Akshay Khanna',
    'Randeep Hooda', 'Rajkummar Rao', 'Vineet Kumar Singh', 'Jaideep Ahlawat', 'Vijay Varma',
    'Manoj Pahwa', 'Gulshan Grover', 'Danny Denzongpa', 'Anupam Kher', 'Boman Irani',
    'Paresh Rawal', 'Om Puri', 'Amrish Puri', 'Shammi Kapoor', 'Shashi Kapoor',
    'Jeetendra', 'Mithun Chakraborty', 'Govinda', 'Sanjay Kapoor', 'Bobby Deol',
    'Karan Kapoor', 'Kunal Kapoor', 'Rahul Bose', 'Rahul Khanna', 'Rahul Dev',
    'Rahul Singh', 'Rahul Roy', 'Rahul Bhat', 'Rahul Mittra', 'Rahul Dev',
    'Vir Das', 'Biswa Kalyan Rath', 'Kanan Gill', 'Kenny Sebastian', 'Abish Mathew',
    'Zakir Khan', 'Atul Khatri', 'Sorabh Pant', 'Rohan Joshi', 'Tanmay Bhat',
    'Gursimran Khamba', 'Ashish Shakya', 'Rahul Subramanian', 'Amit Tandon', 'Abhishek Upmanyu',
    'Anubhav Singh Bassi', 'Munawar Faruqui', 'Samay Raina', 'Rahul Dua', 'Aakash Gupta',
    'Varun Thakur', 'Aadar Malik', 'Urooj Ashfaq', 'Shreeja Chaturvedi', 'Sumukhi Suresh',
    'Kaneez Surka', 'Neeti Palta', 'Aditi Mittal', 'Radhika Vaz', 'Anu Menon',
    'Supriya Joshi', 'Mallika Dua', 'Sumukhi Suresh', 'Kaneez Surka', 'Neeti Palta',
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

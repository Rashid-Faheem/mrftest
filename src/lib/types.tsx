// type Student = {
//   id: string
//   username: string
//   name: string
//   surname: string
//   email: string
//   phone: string
//   address: string
//   sex: string
//   fcnic:string
//   mcnic: string
//   session_id:number
//   class_id:number
//   createdAt: string
// }


type sessionMaster = {
  id: string
  sessionName: string
  startDate: Date
  endDate: Date
  active: boolean
  createdAt: Date
}

type ClassMaster = {
  id: number
  class_name: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}
type paymentMonth = {
  id: number
  month_name: string
  date: Date
  active: boolean
  session_id: number | null // <-- allow null
  createdAt: Date
  updatedAt: Date
  session: {
    id: number
    sessionName: string
    startDate: Date
    endDate: Date
    active: boolean
    createdAt: Date
    updatedAt: Date
  } | null // <-- if session is optional
}

type Student = {
  id: number
  name: string
  fname: string
  mname?: string | null
  sex: 'MALE' | 'FEMALE' // or use your actual enum type
  address?: string | null
  dob?: Date | null
  contactno: string
  active: boolean
  donation: boolean
  fcnic?: string | null
  mcnic?: string | null
  session_id?: number | null
  class_id?: number | null
  createdAt: Date
  updatedAt: Date

  session?: {
    id: number
    sessionName: string
    startDate: Date
    endDate: Date
    active: boolean
    createdAt: Date
    updatedAt: Date
  } | null

  class_?: {
    id: number
    class_name: string
    active: boolean
    createdAt: Date
    updatedAt: Date
  } | null
}

type categoryMaster = {
  id: number
  category: string
  active: boolean
  tutionfee?: boolean // optional, default to false if not provided
  createdAt: Date
  updatedAt: Date
}

/*
type FeeVoucherListPage = {
  feeMaster: {
    id: number
    vno: number
    tdate: Date
    session_id: number
    category_id: number
    paymentMonth_id: number

    session: sessionMaster
    category: categoryMaster
    paymentMonth: paymentMonth

    feeDetail: feeDetail[]
  }
}

type feeDetail = {
  id: number
  feeMaster_id: number
  student_id: number
  section: string
  studentClass_id: number
  amount: number
  settledvno: number
  settled: boolean

  feeMaster: {
    id: number
    vno: number
    tdate: Date
    session_id: number
    category_id: number
    paymentMonth_id: number

    session: sessionMaster
    category: categoryMaster
    paymentMonth: paymentMonth
  }

  student: Student

  studentClass?: {
    id: number
    class_name: string
    active: boolean
  } | null // optional if not always present
}

  
model feeMaster {
  id          Int            @id @default(autoincrement())
  vno         Int            @unique
  tdate       DateTime
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  session_id Int
  category_id Int
  paymentMonth_id Int

  session    SessionMaster @relation(fields: [session_id], references: [id])
  category   CategoryMaster @relation(fields: [category_id], references: [id])
  paymentMonth PaymentMonth @relation(fields: [paymentMonth_id], references: [id])
  

  feeDetail feeDetail[]
}

model feeDetail {
  id          Int            @id @default(autoincrement())
  feeMaster_id Int
  student_id  Int
  section     String
  studentClass_id Int
  amount      Float
  settledvno  Int             @default(0)
  settled     Boolean        @default(false)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  feeMaster   feeMaster      @relation(fields: [feeMaster_id], references: [id])
  student     Student        @relation(fields: [student_id], references: [id])
  studentClass StudentClass @relation(fields: [studentClass_id], references: [id])
 
}
  */




type feeDetail = {
  id: number;
  feeMaster_id: number;
  student_id: number;
  section: string;
  class_id: number;
  amount: number;
  settledvno: number;
  settled: boolean;

  feeMaster: {
    id: number;
    vno: number;
    tdate: Date;
    session_id: number;
    category_id: number;
    paymentMonth_id: number;

    session: { sessionName: string };
    category: { category: string };
    paymentMonth: { month_name: string };
  };
  class_?: { class_name: string; active: boolean } | null; // optional if not always present
    

  student: { name: string };

  studentClass?: {
    id: number;
    class_name: string;
    active: boolean;
  } | null;
};

type FeeVoucherListPage = {
  id: number;
  vno: number;
  tdate: Date;
  amount: number;
  class_?: { class_name: string; active: boolean } | null; // optional if not always present
  section: string;
   student: { name: string; id: number; fname: string };
};
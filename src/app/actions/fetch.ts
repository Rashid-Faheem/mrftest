"use server";

import { prisma } from "@/lib/prisma" ;

// -------------------  session Master ---------------------
export async function fetchSessions() {
  const sessions = await prisma.sessionMaster.findMany({
    orderBy: { startDate: "desc" },
  });
  return sessions;
}

export async function getSessionById(id: string) {
  const session = await prisma.sessionMaster.findUnique({
    where: { id: id },
  });
  return session;
}

export async function getPaymentMonthsBySession(sessionId: string) {
  return await prisma.paymentMonth.findMany({
    where: { session_id: sessionId },
  });
}

export async function upsertSession(id: string | null, data: any) {
  if (id) {
    await prisma.sessionMaster.update({
      where: { id: id },
      data,
    });
  } else {
    await prisma.sessionMaster.create({ data });
  }
}

export async function deleteSession(id: string) {
  try {
    await prisma.sessionMaster.delete({
      where: { id: id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting session:", error);
    return { success: false, message: "Failed to delete session" };
  }
}

// ---------------- class master data -------------------------

export async function fetchClassMasters() {
  const classMaster = await prisma.classMaster.findMany({
    orderBy: { createdAt: "desc" },
  });
  return classMaster;
}

export async function getClassById(id: string) {
  const classMaster = await prisma.classMaster.findUnique({
    where: { id: id },
  });
  return classMaster;
}

export async function upsertClass(formData: any, id?: string) {
  try {
    const data = {
      class_name: formData.class_name.toUpperCase(),
      active: formData.active,
    };

    if (id) {
      await prisma.classMaster.update({
        where: { id:id },
        data,
      });
      return { success: true, message: "Class updated successfully" };
    } else {
      await prisma.classMaster.create({ data });
      return { success: true, message: "Class created successfully" };
    }
  } catch (err) {
    console.error("Save error:", err);
    return { success: false, message: "Failed to save class" };
  }
}

export async function deleteClassMaster(id: string) {
  try {
    await prisma.classMaster.delete({
      where: { id: (id) },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting Class:", error);
    return { success: false, message: "Failed to delete Class" };
  }
}

// ----------------Payment Month (get open sessions) -------------------------
export async function getOpenSessions() {
  // Step 1: Get all session IDs that have payment months
  const usedSessions = await prisma.paymentMonth.findMany({
    distinct: ["session_id"],
    select: { session_id: true },
  });

  const usedSessionIds = usedSessions.map((pm) => pm.session_id);

  // Step 2: Get sessions NOT IN usedSessionIds
  const openSessions = await prisma.sessionMaster.findMany({
    where: {
      id: {
        notIn:
          usedSessionIds.length > 0
            ? usedSessionIds.filter((id): id is string => id !== null)
            : [], // avoid empty [] bug
      },
    },
    orderBy: { startDate: "asc" },
  });

  return openSessions;
}

export async function createPaymentMonths(
  sessionId: string,
  months: { label: string; value: string }[]
) {
  try {
    const entries = months.map((m) => ({
      month_name: m.label,
      date: new Date(m.value),
      session_id: (sessionId),
      active: true,
    }));

    await prisma.paymentMonth.createMany({
      data: entries,
      //   skipDuplicates: true, // Avoid duplicates
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating payment months:", error);
    return { success: false, error: "Failed to generate months" };
  }
}

export async function fetchPaymentMonths() {
  return await prisma.paymentMonth.findMany({
    include: { session: true },
    orderBy: { date: "desc" },
  });
}

// ---------------------    student master -----------------------------
export async function fetchStudents() {
  return await prisma.student.findMany({
    include: {
      class_: true,
      session: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function getStudentById(id: string) {
  return await prisma.student.findUnique({
    where: { id: (id) },
  });
}

export async function getActiveSessions() {
  return await prisma.sessionMaster.findMany({
    where: { active: true },
    orderBy: { startDate: "asc" },
  });
}

export async function getActiveClasses() {
  return await prisma.classMaster.findMany({
    where: { active: true },
    orderBy: { class_name: "asc" },
  });
}

export async function createOrUpdateStudent(id: string | null, data: any) {
  if (id) {
    return await prisma.student.update({
      where: { id: (id) },
      data,
    });
  } else {
    return await prisma.student.create({ data });
  }
}

export async function deleteStudent(id: string) {
  try {
    await prisma.student.delete({
      where: { id: (id) },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting Student:", error);
    return { success: false, message: "Failed to delete Student Record!" };
  }
}



export async function insertnewClass(data: any) {
  await prisma.studentClass.create({ data });
}





// ---------------- Category master data -------------------------

export async function fetchCategoryMaster() {
  const CategoryMaster = await prisma.categoryMaster.findMany({
    // orderBy: { createdAt: "desc" },
  });
  return CategoryMaster;
}



export async function getcategoryById(id: string) {
  const categoryMaster = await prisma.categoryMaster.findUnique({
    where: { id: (id) },
  });
  return categoryMaster;
}

export async function upsertcategoryMaster(formData: any, id?: string) {
  try {
    const data = {
      category: formData.category.toUpperCase(),
      active: formData.active,
      tutionfee: formData.tutionfee ?? false, // Default to false if not provided
    };

    if (id) {
      await prisma.categoryMaster.update({
        where: { id: (id) },
        data,
      });
      return { success: true, message: "Category updated successfully" };
    } else {
      await prisma.categoryMaster.create({ data });
      return { success: true, message: "Category created successfully" };
    }
  } catch (err) {
    console.error("Save error:", err);
    return { success: false, message: "Failed to save Category" };
  }
}

export async function deleteCategoryMaster(id: string) {
  try {
    await prisma.categoryMaster.delete({
      where: { id: (id) },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting Category:", error);
    return { success: false, message: "Failed to delete Category" };
  }
}


export async function getActiveCategories() {
  return await prisma.categoryMaster.findMany({
    where: { active: true },
  });
}

export async function fetchFeeVoucherList() {
  return await prisma.feeDetail.findMany({
    where: { settled: false },
    include: {
      feeMaster: { 
        include: {
          session: true,
          category: true,
          paymentMonth: true, // ✅ Add this

        }
      },
      student: true,
      class_: true,
    },
    orderBy: { id: "desc" },
  });
}

export async function deleteFeeDetail(id: string) {
  try {
    await prisma.feeDetail.delete({
      where: { id: (id), settled: false, },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting session:", error);
    return { success: false, message: "Failed to delete session" };
  }
}


export async function getFeeVoucher(stdid: string) {
  return await prisma.feeDetail.findMany({
    where: { student_id: stdid, settled: false },
    include: {
      feeMaster: {
        include: {
          session: true,
          category: true,
          paymentMonth: true, // ✅ Add this
        }
      },
      student: true,
      class_: true,
    },
    orderBy: { id: "asc" },
  });
}

export async function PrintFeeVoucher(v_no: number) {
  // console.log(typeof(v_no));
  return await prisma.feePayment.findUnique({
where: { vno: v_no },
    include: {
        feeDetail:{
            include:{
                feeMaster:{
                    include:{
                        session:true,
                        category:true,
                        paymentMonth:true
                    }
                },
            }
        },
        student:true,
        class_:true,
    

    }
  });

}

export async function ReceiptVoucherList() {
  // console.log(typeof(v_no));
  return await prisma.feePayment.findMany({
// where: { vno: v_no },
    include: {
        feeDetail:{
            include:{
                feeMaster:{
                    include:{
                        session:true,
                        category:true,
                        paymentMonth:true
                    }
                },
            }
        },
        student:true,
        class_:true,
    

    }
  });

}


export async function getReceiptById(id: string) {
  const feePayment = await prisma.feePayment.findUnique({
    where: { id: (id) },
  });
  return feePayment;
}

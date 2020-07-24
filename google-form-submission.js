const fetch = require('node-fetch');

const FORM_ID = `1FAIpQLSe_U-O2su01BlL4lHSShGOigHioUKUn5BSnQiurNcTIagY6hA`;

// for (let i = 0; i < 10; i++)
    submit();

function submit() {

    let interestInStudy = inRange(1, 5);
    let distanceToSchool = inRange(15, 90);
    let familyRelationship = inRange(1, 5);
    let selfStudyTime = inRange(5, 70);
    let age = inRange(17, 22);
    let origin = inRange(0, 1);
    let extraClass = inRange(0, 1);

    // [ 'Yếu', 'Trung Bình', 'Khá' , 'Giỏi', 'Xuất Sắc' ]
    let failCount, continueStudy, freeTime, alcoholUsageWeekday, alcoholUsageWeekend, skipCount, grade;
    if (interestInStudy <= 2 && distanceToSchool > 50) {
        failCount = inRange(4, 10);
        continueStudy = priorityPick([ [ 3, 'Có'] , [ 7, 'Không']]);
        freeTime = inRange(3, 5);
        alcoholUsageWeekday = inRange(2, 4);
        alcoholUsageWeekend = inRange(3, 5);
        skipCount = inRange(5, 15);
        grade = [ 'Yếu', 'Trung Bình' ];
    } else if (interestInStudy <= 2 && familyRelationship <= 2 & selfStudyTime < 30) {
        failCount = inRange(4, 10);
        continueStudy = priorityPick([ [ 4, 'Có'] , [ 6, 'Không']]);
        freeTime = inRange(3, 5);
        alcoholUsageWeekday = inRange(3, 4);
        alcoholUsageWeekend = inRange(4, 5);
        skipCount = inRange(5, 15);
        grade = [ 'Yếu', 'Trung Bình' ];
    } else if (origin == 1) {
        interestInStudy = inRange(1, 4);
        failCount = inRange(5, 10);
        continueStudy = priorityPick([ [ 8, 'Có'] , [ 2, 'Không']]);
        freeTime = inRange(4, 5);
        alcoholUsageWeekday = inRange(2, 3);
        alcoholUsageWeekend = inRange(3, 4);
        skipCount = inRange(5, 10);
        grade = [ 'Trung Bình', 'Khá' ];
    } else if (extraClass == 1 && interestInStudy >= 4) {        
        failCount = inRange(1, 5);
        continueStudy = priorityPick([ [ 9, 'Có'] , [ 1, 'Không']]);
        freeTime = inRange(1, 2);
        alcoholUsageWeekday = inRange(2, 4);
        alcoholUsageWeekend = inRange(4, 5);
        skipCount = inRange(5, 10);
        grade = [ 'Trung Bình', 'Khá', 'Giỏi' ];
    } else if (Math.random() < 0.5) {
        selfStudyTime = inRange(40, 60);
        failCount = inRange(5, 8);
        continueStudy = priorityPick([ [ 8, 'Có'] , [ 2, 'Không']]);
        freeTime = inRange(3, 5);
        alcoholUsageWeekday = inRange(1, 3);
        alcoholUsageWeekend = inRange(3, 5);
        skipCount = inRange(5, 10);
        grade = [ 'Yếu', 'Trung Bình', 'Khá' ];
    } else {
        failCount = inRange(1, 5);
        continueStudy = priorityPick([ [ 9, 'Có'] , [ 1, 'Không']]);
        freeTime = inRange(3, 7);
        alcoholUsageWeekday = inRange(1, 2);
        alcoholUsageWeekend = inRange(1, 3);
        skipCount = inRange(1, 3);
        grade = [ 'Trung Bình', 'Khá', 'Giỏi' ];
    }


    const response = {
        'entry.441861675': oneOf([ 'Nam', 'Nữ']),
        'entry.1012681380': age < 19 ? 'THPT' : 'Đại học',
        'entry.2029593679': age,
        'entry.236934738': !origin ? 'Nông thôn' : 'Thành phố',
        'entry.492784055': oneOf(['Lớn hơn bằng 3', 'Nhỏ hơn bằng 3']),
        'entry.599602255': oneOf(['Bố', 'Mẹ']),
        'entry.851779762': priorityPick([ [ 1, 'Tiểu học' ], [ 10, 'THCS' ], [ 20, 'THPT' ], [ 50, 'Trung Cấp / Cao Đẳng / Đại Học' ] ]),
        'entry.541422836': priorityPick([ [ 1, 'Tiểu học' ], [ 10, 'THCS' ], [ 20, 'THPT' ], [ 50, 'Trung Cấp / Cao Đẳng / Đại Học' ] ]),
        'entry.29029801': oneOf(['Giáo dục', 'Y tế', 'Văn phòng', 'Kinh doanh', 'Ở nhà' ]),
        'entry.320448931': oneOf(['Giáo dục', 'Y tế', 'Văn phòng', 'Kinh doanh', 'Ở nhà' ]),
        'entry.2069151105': familyRelationship,
        'entry.931102911': oneOf(['Gần nha', 'Danh tiếng', 'Chất lượng đào tạo' ]),
        'entry.958987304': distanceToSchool, // Thời gian đi tới trường
        'entry.333443038': selfStudyTime, // Thời gian tự học trong tuần
        'entry.860629547': interestInStudy, // Sự hứng thú với học tập
        'entry.798988769': inRange(0, 10), // Số lần rớt môn
        'entry.1359125405': oneOf([ 'Có', 'Không']), // Hỗ trợ từ trường
        'entry.631719899': oneOf([ 'Có', 'Không']),  // Gia đình
        'entry.2124853810': extraClass ? 'Có' : 'Không', // Học thêm
        'entry.928066474': oneOf([ 'Có', 'Không']),  // Tham gia ngoại khóa
        'entry.2120293504': continueStudy, // Tiếp tục học
        'entry.1685366286': oneOf([ 'Có', 'Không']), // Dùng internet
        'entry.817898575': oneOf([ 'Có', 'Không']),  // Đang yêu
        'entry.916714262': inRange(1, 5),   // Thời gian rảnh
        'entry.844251876': inRange(1, 5),   // Tần suất gặp bạn
        'entry.220509804': alcoholUsageWeekday,   // Tần suát sử dụng rượu bia trong tuần
        'entry.1479250152': alcoholUsageWeekend,  //      ...                  cuối tuần
        'entry.958520001': inRange(1, 5),   // Sức khỏe hiện tại
        'entry.756777041': skipCount,  // Số lần nghỉ học
        'entry.624502069': oneOf(grade),
        'entry.334056681': oneOf(grade),
        'entry.1465354642': oneOf(grade),
        'pageHistory': '0,1,2,3,4',
    }

    const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse?${encodeAnswer(response)}&submit=SUBMIT`;
    console.log(url);

    // fetch(url, {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     referer: 'no-referer',
    // });
}

function encodeAnswer(answer) {
    let result = '';
    Object.entries(answer).forEach(([ key, value ]) => {
        result += `&${key}=${encodeURI(value)}`;
    });

    return result;
}

function oneOf(arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))]
}

function inRange(start, end) {
    return Math.round(Math.random() * (end - start) + start);
}

function priorityPick(arr) {
    let totalPrior = 0;
    arr.forEach(([ prior ]) => totalPrior += prior);

    const pick = Math.random() * totalPrior;

    let currPrior = 0;
    for (let i = 0; i < arr.length; i++) {
        if (currPrior < pick && pick <= currPrior + arr[i][0])
            return arr[i][1];
        currPrior += arr[i][0];
    }
}
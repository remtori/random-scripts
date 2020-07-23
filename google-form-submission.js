const fetch = require('node-fetch');

const FORM_ID = `1FAIpQLSe_U-O2su01BlL4lHSShGOigHioUKUn5BSnQiurNcTIagY6hA`;

for (let i = 0; i < 500; i++)
    submit();

function submit() {
    const response = {
        'entry.441861675': oneOf([ 'Nam', 'Nữ']),
        'entry.1012681380': oneOf([ 'THPT', 'Đại học']),
        'entry.2029593679': oneOf([ 17, 18, 19, 20, 21, 22 ]),
        'entry.236934738': oneOf([ 'Nông thôn', 'Thành phố' ]),
        'entry.492784055': oneOf(['Lớn hơn bằng 3', 'Nhỏ hơn bằng 3']),
        'entry.599602255': oneOf(['Bố', 'Mẹ']),
        'entry.851779762': priorityPick([ [ 1, 'Tiểu học' ], [ 10, 'THCS' ], [ 20, 'THPT' ], [ 50, 'Trung Cấp / Cao Đẳng / Đại Học' ] ]),
        'entry.541422836': priorityPick([ [ 1, 'Tiểu học' ], [ 10, 'THCS' ], [ 20, 'THPT' ], [ 50, 'Trung Cấp / Cao Đẳng / Đại Học' ] ]),
        'entry.29029801': oneOf(['Giáo dục', 'Y tế', 'Văn phòng', 'Kinh doanh', 'Ở nhà' ]),
        'entry.320448931': oneOf(['Giáo dục', 'Y tế', 'Văn phòng', 'Kinh doanh', 'Ở nhà' ]),
        'entry.2069151105': priorityPick([ [ 1, 1 ], [ 10, 2 ], [ 30, 3 ], [ 50, 4 ], [ 50, 5 ] ]),
        'entry.931102911': oneOf(['Gần nha', 'Danh tiếng', 'Chất lượng đào tạo' ]),
        'entry.958987304': inRange(15, 90), // Thời gian đi tới trường
        'entry.333443038': inRange(7, 70), // Thời gian tự học trong tuần
        'entry.860629547': inRange(2, 5), // Sự hứng thú với học tập
        'entry.798988769': inRange(0, 10), // Số lần rớt môn
        'entry.1359125405': oneOf([ 'Có', 'Không']),
        'entry.631719899': oneOf([ 'Có', 'Không']),
        'entry.2124853810': oneOf([ 'Có', 'Không']),
        'entry.928066474': oneOf([ 'Có', 'Không']),
        'entry.2120293504': oneOf([ 'Có', 'Không']),
        'entry.1685366286': oneOf([ 'Có', 'Không']),
        'entry.817898575': oneOf([ 'Có', 'Không']),
        'entry.916714262': inRange(1, 5),
        'entry.844251876': inRange(1, 5),
        'entry.220509804': inRange(1, 5),
        'entry.1479250152': inRange(1, 5),
        'entry.958520001': inRange(1, 5),
        'entry.756777041': inRange(0, 33),
        'entry.624502069': priorityPick([ [ 23, 'Yếu' ], [ 40, 'Trung Bình' ], [ 25, 'Khá' ], [ 10, 'Giỏi'], [ 2, 'Xuất Sắc'] ]),
        'entry.334056681': priorityPick([ [ 23, 'Yếu' ], [ 40, 'Trung Bình' ], [ 25, 'Khá' ], [ 10, 'Giỏi'], [ 2, 'Xuất Sắc'] ]),
        'entry.1465354642': priorityPick([ [ 23, 'Yếu' ], [ 40, 'Trung Bình' ], [ 25, 'Khá' ], [ 10, 'Giỏi'], [ 2, 'Xuất Sắc'] ]),
        'pageHistory': '0,1,2,3,4',
    }

    const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse?${encodeAnswer(response)}&submit=SUBMIT`;
    // console.log(url);

    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        referer: 'no-referer',
    });
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
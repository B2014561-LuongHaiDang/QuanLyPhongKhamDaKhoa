import { useState } from "react";

const FormBMI = () => {
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [gender, setGender] = useState("");
    const [bmi, setBmi] = useState(null);
    const [message, setMessage] = useState("");

    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [isExplanationVisible, setIsExplanationVisible] = useState(false);
    const [isBMICalculation, setIsBMICalculation] = useState(false);
    const [isImportantBMI, setIsImportantBMI] = useState(false);


    const toggleInfoVisibility = () => {
        setIsInfoVisible(!isInfoVisible);
    };
    const toggleExplanationVisibility = () =>
        setIsExplanationVisible(!isExplanationVisible);

    const toggleBMICalculation = () =>
        setIsBMICalculation(!isBMICalculation);

    const toggleImportantBMI = () =>
        setIsImportantBMI(!isImportantBMI);

    const calculateBMI = (e) => {
        e.preventDefault();

        if (!height || !weight || !gender) {
            setMessage("Vui lòng nhập đầy đủ thông tin!");
            setBmi(null);
            return;
        }

        const heightInMeters = height / 100;
        const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(1);


        setBmi(calculatedBMI);

        if (gender === "Nam") {
            if (calculatedBMI < 18.5) {
                setMessage("Bạn đang thiếu cân!");
            } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
                setMessage("Bạn có cân nặng bình thường.");
            } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
                setMessage("Bạn đang thừa cân!");
            } else {
                setMessage("Bạn bị béo phì!");
            }
        } else if (gender === "Nữ") {
            if (calculatedBMI < 18) {
                setMessage("Bạn đang thiếu cân!");
            } else if (calculatedBMI >= 18 && calculatedBMI < 23.9) {
                setMessage("Bạn có cân nặng bình thường.");
            } else if (calculatedBMI >= 24 && calculatedBMI < 29) {
                setMessage("Bạn đang thừa cân!");
            } else {
                setMessage("Bạn bị béo phì!");
            }
        }
    };

    return (
        <div className="min-h-screen ">
            <div className="bg-blue-300 py-8">
                <div className="container mx-auto flex items-center justify-center space-x-6">
                    {/* Hình ảnh */}
                    <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center">
                        <img
                            src="https://hhg-common.hellobacsi.com/common/nav-icons/health-tools.svg"
                            alt="Chuyên mục"
                            className="w-28 h-28" // Cung cấp kích thước phù hợp cho ảnh
                        />
                    </div>

                    {/* Nội dung chữ */}
                    <div className="text-left">
                        <h1 className="text-2xl font-bold text-black mb-2">Đo chỉ số BMI</h1>
                        <p className="text-lg text-black">
                            Kết quả đo chỉ số BMI giúp bạn biết mình đang thừa cân, béo phì hay suy dinh dưỡng để kịp thời điều chỉnh lối sống.
                        </p>
                    </div>
                </div>
            </div>



            <div className="container mx-auto mt-8">
                <form className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto space-y-4" onSubmit={calculateBMI}>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Tuổi của bạn (năm)</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Ví dụ: 25"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Giới tính của bạn</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Nam"
                                    onChange={(e) => setGender(e.target.value)}
                                    className="mr-2"
                                />
                                Nam
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Nữ"
                                    onChange={(e) => setGender(e.target.value)}
                                    className="mr-2"
                                />
                                Nữ
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Bạn cao bao nhiêu? (cm)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Ví dụ: 170"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Cân nặng của bạn (kg)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Ví dụ: 60"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                        Tính ngay
                    </button>
                </form>

                {bmi && (
                    <div className="mt-8 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
                        <p className="text-lg font-semibold text-blue-700">Chỉ số BMI của bạn: {bmi}</p>
                        <p className="text-gray-700">{message}</p>
                    </div>
                )}
            </div>

            <div className="container mx-auto mt-8 bg-white">
                <div>
                    <h2
                        onClick={toggleBMICalculation} // Gọi hàm toggle khi click vào tiêu đề
                        className="text-lg font-semibold text-black cursor-pointer hover:no-underline"
                    >
                        Chỉ số BMI là gì? - Định nghĩa chỉ số khối cơ thể BMI
                    </h2>
                    {isBMICalculation && (
                        <p className="mt-2 text-gray-700">
                            Chỉ số khối cơ thể (BMI) là phép đo trọng lượng của một người tương ứng với chiều cao của người đó.
                            Chỉ số BMI có thể cho thấy bạn đang có mức cân nặng bình thường so với chiều cao hay béo phì,
                            thừa cân, thiếu cân hay suy dinh dưỡng.
                        </p>
                    )}
                </div>

                <div>
                    <h2 onClick={toggleExplanationVisibility}
                        className="text-lg font-semibold text-black cursor-pointer hover:no-underline">
                        Giải thích chỉ số BMI
                    </h2>
                    {isExplanationVisible && (
                        <>
                            <p className="mt-2 text-gray-700">
                                Đối với người lớn từ 20 tuổi trở lên, BMI được tính bằng cách sử dụng các phân loại trạng thái cân nặng tiêu chuẩn. Các chuẩn này giống nhau với nam giới và phụ nữ ở mọi thể trạng và lứa tuổi.
                            </p>
                            <p className="mt-2 text-gray-700">
                                Đối với trẻ em và thanh thiếu niên, BMI phân biệt theo tuổi và giới tính và thường được gọi là BMI theo tuổi. Ở trẻ em, lượng chất béo trong cơ thể cao có thể dẫn đến các bệnh liên quan đến cân nặng và các vấn đề sức khỏe khác. Thiếu cân cũng có thể tăng nguy cơ mắc một số tình trạng sức khỏe, bệnh lý.
                            </p>
                            <p className="mt-2 text-gray-700">
                                Chỉ số BMI cao thường cho thấy cơ thể thừa cân. Chỉ số này không trực tiếp đo lượng mỡ trong cơ thể nhưng có tương quan với các phép đo trực tiếp xác định lượng mỡ trong cơ thể.
                            </p>
                        </>
                    )}
                </div>

                <div>
                    <h2
                        onClick={toggleInfoVisibility} // Gọi hàm toggle khi click vào tiêu đề
                        className="text-lg font-semibold text-black cursor-pointer hover:no-underline"
                    >
                        Công thức tính BMI là gì?
                    </h2>
                    {isInfoVisible && (
                        <>
                            <p className="mt-2 text-gray-700">
                                Bạn có thể kiểm tra chỉ số BMI của mình bằng cách sử dụng chiều cao và trọng lượng cơ thể. Để tính chỉ số BMI của một người trưởng thành, hãy chia trọng lượng (theo kg) cho bình phương chiều cao (theo m) hay BMI = (trọng lượng cơ thể)/ (chiều cao x chiều cao)
                            </p>
                            <p className="mt-2 text-gray-700">
                                Đối với người lớn, chỉ số BMI từ 18,5-24,9 nằm trong mức cân nặng bình thường hoặc khỏe mạnh. Chỉ số BMI từ 25,0 trở lên là thừa cân, trong khi chỉ số BMI dưới 18,5 là thiếu cân.
                            </p>
                        </>
                    )}
                </div>

                <div>
                    <h2
                        onClick={toggleImportantBMI} // Gọi hàm toggle khi click vào tiêu đề
                        className="text-lg font-semibold text-black cursor-pointer hover:no-underline"
                    >
                        Tại sao bạn nên biết về chỉ số BMI?
                    </h2>
                    {isImportantBMI && (
                        <>
                            <p className="mt-2 text-gray-700">
                                Biết được chỉ số BMI của bạn cho phép bạn kiểm soát tỷ lệ chất béo trong cơ thể tương quan với chiều cao, cũng như biết được nguy cơ hình thành một số vấn đề sức khỏe liên quan. Chỉ số BMI cao có thể dẫn đến nguy cơ thừa cân, trong đó không loại trừ khả năng mắc bệnh tiểu đường type 2, bệnh tim và tăng huyết áp.
                            </p>
                            <p className="mt-2 text-gray-700">
                                Hiểu về chỉ số BMI cho phép bạn và chuyên gia y tế chăm sóc sức khỏe của bạn tốt hơn.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormBMI;

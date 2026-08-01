from services.medical_parser import parse_tests


def test_parse_tests_detects_known_parameters() -> None:
    tests = parse_tests("Hemoglobin 13.4 g/dL Vitamin D 18 ng/mL LDL Cholesterol 142 mg/dL")

    assert [test.name for test in tests] == ["Hemoglobin", "Vitamin D", "LDL Cholesterol"]
    assert tests[0].status == "normal"
    assert tests[1].status == "low"
    assert tests[2].status == "high"


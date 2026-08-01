from schemas.report import ReportSummary

_REPORTS: list[ReportSummary] = []


def save_report(report: ReportSummary) -> ReportSummary:
    _REPORTS.insert(0, report)
    return report


def list_reports() -> list[ReportSummary]:
    return _REPORTS


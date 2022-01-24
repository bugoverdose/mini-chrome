# 미니 크롬 : 구현할 기능 목록 (우테코 스타일)

## 헤더 배경

- [ ] 마우스로 텍스트 부분만 따로 선택할 수 없도록 설정
- [ ] focus되지 않은 스크린에서는 위아래 색상 반대로 설정

## 신호등 컨트롤러

- [x] 윈도우든 맥이든 맥의 traffic lights 기능 그대로 구현
  - [x] 화면 닫기
  - [x] 화면 최소화
  - [x] 전체화면 모드 토글
- [x] 특정 버튼을 누르고 있으면 해당 버튼만 살짝 어둡게 색상 변경
- [x] 특정 버튼 누른 상태로 마우스 이동시, 드래그되지 않도록 설정
- [x] 특정 버튼에 마우스 hover시 클릭했을 때 발생할 이벤트에 대한 설명 표시
- [ ] focus되지 않은 스크린에서는 세 버튼 모두 회색으로 설정
- hover했을 때 관련 아이콘 보여줄지 말지는 보류

## 탭

- [ ] 현재 윈도우에 존재하는 모든 view들에 대한 간략한 정보 표시
  - [ ] favicon
  - [ ] 디폴트 favicon
  - [ ] title 태그
- [ ] 특정 탭에 마우스 hover시 탭에 대한 정보 출력
  - [ ] title 태그
  - [ ] url 정보
- [ ] 새 탭 생성 기능 구현
- [ ] 기존 탭 삭제 기능 구현
- [ ] 현재 화면에 보여지는 탭은 다르게 보이도록
- [ ] 화면에 보여주는 탭 변경 기능 구현
- [ ] 드래그 앤 드롭 기능 구현
  - [ ] 탭들 사이에서 좌우 이동시, 탭들의 순서 변경
  - [ ] 탭들의 영역을 벗어나는 경우 새로운 윈도우 생성

## omnibox

- [ ] 새 탭 생성 시점에 input에 키보드 자동 focus
- [ ] input에 focus된 상태에서는 border를 파란색으로
- [ ] input에 url 입력하여 해당 탭에 페이지 로드
- [ ] url 대신 키워드 입력하는 경우 구글 검색으로 이동
- [ ] 현재 view에 표시되는 주소가 변한 경우 omnibox에 해당 url 출력

## view utils

- [ ] url history 스택 구현
  - [ ] 뒤로가기 버튼 구현
  - [ ] 앞으로가기 버튼 구현
  - [ ] 현재 view에서 주소 이동시, url history에 추가
- [ ] 새로고침 버튼 구현

## favorites

- [ ] 해당 데스크탑 내부에 자체적으로 즐겨찾기 목록 저장
- [ ] 폴더 생성 기능 구현을 통해 즐겨찾기 목록 구조화
- [ ] 새 탭에서는 항상 즐겨찾기 목록 바 보이도록
- [ ] url 정보가 존재하면 즐겨찾기 목록 바 안보이도록 제거
- [ ] 즐겨찾기 항목 클릭시, 현재 탭은 해당 url로 이동

## 개발자 도구 관련

- [ ] header : 개발 완료 후 개발자도구 열릴 수 없도록 방지
- [ ] View : 개발자도구 열릴 수 있도록 설정
- [ ] 윈도우 전체 단축키 : 맥/윈도우 명령어로 실행시, View의 개발자도구가 열리도록 설정

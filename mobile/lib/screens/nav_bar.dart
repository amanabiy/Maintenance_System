import 'package:flutter/material.dart';
import 'package:mobile/screens/add_request_page.dart';
import 'package:mobile/screens/authentication/check_email.dart';
import 'package:mobile/screens/authentication/login_page.dart';
import 'package:mobile/screens/authentication/reset_password.dart';
import 'package:mobile/screens/requests_list_page.dart';
import 'package:stylish_bottom_bar/stylish_bottom_bar.dart';

class HomePage extends StatefulWidget {
  static const String routeName = '/home';
  const HomePage({super.key, this.title});

  final String? title;

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  PageController pageController = PageController();

  final List<Widget> bottomBarPages = [
    const RequestsPage(),
    const AddRequestPage(),
    const CheckEmailPage(description: 'Nothing here',),
    const ResetPasswordPage(),
  ];

  int selected = 0;
  var heart = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: pageController,
        physics: const NeverScrollableScrollPhysics(),
        children: List.generate(
            bottomBarPages.length, (index) => bottomBarPages[index]),
      ),
      extendBody: true,
      bottomNavigationBar: StylishBottomBar(
        elevation: 15,
        // backgroundColor: const Color(0xff2195F3),
        option: AnimatedBarOptions(
          // iconSize: 32,
          barAnimation: BarAnimation.fade,
          iconStyle: IconStyle.simple,
          // opacity: 0.3,
        ),
        items: [
          BottomBarItem(
            icon: Icon(
              Icons.home,
              color: Colors.blue,
            ),
            selectedIcon: Icon(
              Icons.home_filled,
              color: Colors.blue,
            ),
            selectedColor: Colors.white,
            unSelectedColor: const Color(0xffd4d4d8),
            title: const Text('Home'),
          ),
          BottomBarItem(
              icon: Icon(
                Icons.work,
                color: Colors.blue,
              ),
              selectedIcon: Icon(
                Icons.work_outline,
                color: Colors.blue,
              ),
              selectedColor: Colors.white,
              unSelectedColor: const Color(0xffd4d4d8),
              title: const Text('Jobs')),
          BottomBarItem(
              icon: Icon(
                Icons.notifications,
                color: Colors.blue,
              ),
              selectedIcon: Icon(
                Icons.notifications_outlined,
                color: Colors.blue,
              ),
              selectedColor: Colors.white,
              unSelectedColor: const Color(0xffd4d4d8),
              title: const Text('Alert')),
          BottomBarItem(
            icon: Icon(
              Icons.person,
              color: Colors.blue,
            ),
            selectedIcon: Icon(
              Icons.person_outline,
              color: Colors.blue,
            ),
            selectedColor: Colors.white,
            unSelectedColor: const Color(0xffd4d4d8),
            title: const Text(
              'Profile',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
        hasNotch: true,
        // fabLocation: StylishBarFabLocation.center,
        currentIndex: selected ?? 0,
        onTap: (index) {
          pageController.jumpToPage(index);
          setState(() {
            selected = index;
          });
        },
      ),
    );
  }
}

class BottomIcon extends StatelessWidget {
  final String text;
  final String imageName;
  final Color color;
  const BottomIcon({
    super.key,
    required this.text,
    required this.imageName,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 70,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          // Text(
          //   text,
          //   style: TextStyle(fontSize: 15, color: color),
          // )
        ],
      ),
    );
  }
}

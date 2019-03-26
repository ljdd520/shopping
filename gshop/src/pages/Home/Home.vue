<template>
    <div id="home">
        <HeaderTop></HeaderTop>
        <div class="ljctf_icon">
            <span class="titleNames">
                <span class="o_lineIco"></span>
                <span class="o_leftIco"></span>
                <span style="font-size:24px;">比赛介绍</span>
                <span class="o_rightIco"></span>
                <span class="o_lineIco"></span>
            </span>
        </div>
        <div class="main">
            <div class="list">
                <div class="list2">
                    <h3>
                    <span class="listNum">1.</span><span style="font-size: 25px;">Competition Information</span>
                </h3>
                    <p><span style="position:relative;width:80px;font-size: 19px;color: #191e55">
                        <br>Welcome to BCTF 2018 i.e. HITB-XCTF Dubai International CTF Competition!<br>
                        <br>BCTF is a Jeopardy-style Online Capture The Flag Competition presented by blue-lotus. The game is opened to all participants around the world, and with prizes. Teams can compete from any location. No restriction on the number of participants of any team.<br>
                        <br>BCTF 2018 is also the first qualifying contest of 5th Edition of XCTF International League (http://www.xctf.org.cn/). The Champion will be invited to XCTF Finals 2019 (the location/date subject to change, qualified teams will be informed when the Finals location/date is confirmed). Other teams can also get the cumulative points to compete for other slots to the XCTF Finals 2018.<br>
                        <br>HITB-XCTF Dubai CTF will also use part of the challenges of BCTF 2018, and the on-site teams can both compete for the HITB-XCTF Dubai CTF awards and online BCTF 2018 awards. But only on-site teams can get the awards of HITB-XCTF Dubai CTF. <br>
                    </span></p>
                </div>
                <div class="list2">
                    <h3>
                        <span class="listNum">2.</span><span style="font-size: 25px;">Competition Time</span>
                    </h3>
                    <p><span style="position:relative;width:80px;font-size: 19px;color: #191e55">
                        <br>BCTF 2018 Online CTF<br>
                        <br>36 hours: From 27th November 10:00GST (UTC + 4)  - 28th November 22:00GST (UTC + 4) <br>
                        <br>i.e. 27th November 14:00 Beijing Time – 29th November 02:00 Beijing Time <br>
                        <br>HITB-XCTF Dubai On-site CTF<br>
                        <br>30 hours: 27th &amp; 28th November starting at 10:00GST  (UTC + 4)  and ending at 19:00GST  (UTC + 4)  on Day 1 and restarting on Day 2 at 10:00GST  (UTC + 4)  and ends at 17:00GST  (UTC + 4))<br>
                    </span></p>
                </div>
                <div class="list2">
                    <h3>
                        <span class="listNum">3.</span><span style="font-size: 25px;">Contact</span>
                    </h3>
                    <p><span style="position:relative;width:80px;font-size: 19px;color: #191e55">
                        <br>Please join #BCTF on Freenode.<br>
                        <br>Email us at blue.lotus.ctf@gmail.com<br>
                    </span></p>
                </div>
                <div class="list2">
                    <h3>
                        <span class="listNum">4.</span><span style="font-size: 25px;">Prizes</span>
                    </h3>
                    <p><span style="position:relative;width:80px;font-size: 19px;color: #191e55">
                        <br>1st place 1,000 USD (20% tax included), Qualified to XCTF Finals 2019<br>
                        <br>2nd place 500 USD (20% tax included)<br>
                        <br>3rd place 300 USD (20% tax included)<br>
                        <br>Top 6 ranked teams are required to submit their writeup to http://www.xctf.org.cn<br>
                    </span></p>
                </div>
                <div class="list2">
                    <h3>
                        <span class="listNum">5.</span><span style="font-size: 25px;">Challenge Categories</span>
                    </h3>
                    <p><span style="position:relative;width:80px;font-size: 19px;color: #191e55">
                        <br>everse engineering<br>
                        <br>pwnable<br>
                        <br>web security<br>
                        <br>AI &amp; blockchain<br>
                        <br>crypto<br>
                        <br>MISC (forensic, network analysis)<br>
                    </span></p>
                </div>
                <div class="list2">
                    <h3>
                        <span class="listNum">6.</span><span style="font-size: 25px;">Score and Ranking</span>
                    </h3>
                    <p><span style="position:relative;width:80px;font-size: 19px;color: #191e55">
                        <br>In most cases, flags are of format bctf{.+}. Please submit the entire flag, including BCTF{}, for score. If flag is in other formats, it will be clarified in the challenge description.<br>
                        <br>The score of each challenge will be dynamically calculated according to the number of solved teams.<br>
                        <br>Final ranking is determined by the total score of each team. In case of multiple teams with equal scores, the team that reached the score earlier ranks higher.<br>
                    </span></p>
                </div>
                <div class="list2">
                    <h3>
                        <span class="listNum">7.</span><span style="font-size: 25px;">Contest rules</span>
                    </h3>
                    <p><span style="position:relative;width:80px;font-size: 19px;color: #191e55">
                        <br>Teams breaking rules may be penalized or excluded from the competition.<br>
                        <br>It is not allowed for teams with independent accounts to cooperate, or share any flag/hints.<br>
                        <br>It is not allowed to attack the competition infrastructure. If flaws in the infrastructure are found, please report to us.<br>
                        <br>It is not allowed to sabotage or in any way hinder the progress of other competing teams. This includes attempting to destroy a challenge after you have completed it.<br>
                        <br>It is not allowed to generate large amounts of traffic. None of the challenges can be solved by running automated scanners.<br>
                        <br>It is not allowed to brute-force challenge flags/keys against the scoring site.<br>
                        <br>For placing teams to receive prizes, they must submit a full nand detailed writeup of each challenge, explaining how it was solved.<br>
                        <br>Organizers may rearrange/modify contest problems, proceedings, and rules.<br>
                    </span></p>
                </div>
            </div>
            <div class="list3">
                <span style="color: #191e55;font-size: 23px;float: right">**本平台由LJCTF中心提供**</span>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components: {
    HeaderTop
  }
}
</script>

<style lang="scss" scoped>
    #home{
        width: 100%;
        height: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
        position: absolute;
        .ljctf_icon{
            position: relative;
            margin: 20px 13px;
            .o_lineIco{
                width: 35%;
            }
        }
        .main{
            display:inline-block;
            position: relative;
            width: 80%;
            color: black;
            margin: 0 110px;
            .demo-ruleForm{
                .login-btn{
                    width: 100%;
                    button{
                        width: 100%;
                    }
                }
            }
            .list{
                width: 1200px;
                .list2{
                    margin: 25px auto;
                }
                .listNum {
                    position: relative;
                    width: 52px;
                    height: 52px;
                    left: 0;
                    top: 0;
                    color: #2c3e50;
                    text-align: center;
                    line-height: 52px;
                    font-size: 30px;
                }
            }
        }
    }
</style>

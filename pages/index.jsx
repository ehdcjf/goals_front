import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import DefaultLayout from "../layout/Default";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function Home() {
  return (
    <DefaultLayout>
      <Box padding={10}>
        <Typography variant="h2" paddingBottom={3}>
          Node.js 백앤드 개발자 자격요건 충족하기 프로젝트
        </Typography>

        <Typography variant="h4">
          : Node.js 서버개발자의 자격요건을 충족하기 위해 시작한 프로젝트
        </Typography>

        <Box paddingY={5}>
          <Typography variant="h5">
            1. 채용사이트의 Node.js 자격요건 및 우대사항을 조사
          </Typography>
          <Box paddingX={40}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={"80%"}>이름</TableCell>
                  <TableCell>자격요건</TableCell>
                  <TableCell>우대사항</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    AWS 등 클라우드 기반 개발/사용경험 (ECS, RDS)
                  </TableCell>
                  <TableCell> 17</TableCell>
                  <TableCell>5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>RDB(MySql MariaDB) 설계 구축 운영</TableCell>
                  <TableCell> 14</TableCell>
                  <TableCell> 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>RESTful API 설계 역량</TableCell>
                  <TableCell> 12</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Git을 통한 버전관리</TableCell>
                  <TableCell>11</TableCell>
                  <TableCell> 2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Linux</TableCell>
                  <TableCell>9</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TypeScript를 이용한 개발 경험</TableCell>
                  <TableCell>6</TableCell>
                  <TableCell>5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NoSql(MongoDB) 설계 구축 운영</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>4</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nest.js를 이용한 개발 경험</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ORM 사용에 능숙 (Sequlize) </TableCell>
                  <TableCell>3</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Jenkins, CircleCI ,Gtihub Action 등 CI/CD 개발 경험{" "}
                  </TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>4</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Docker.Kubernetes, ECS 활용 경험</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>3</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Socket.io</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>TDD</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GraphQL</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>일반적인 서비스 아키텍처 설계 역량 </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    React. veu.js 등 최신 Front-end 개발 경험
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    마이크로 서비스 아키텍쳐 설계, 구현, 운영 경험
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>대용량 DB 및 트래픽 경험자</TableCell>
                  <TableCell></TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Swagger 등 Open API 서비스 개발 경험</TableCell>
                  <TableCell></TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Elastic Search에 대한 이해</TableCell>
                  <TableCell></TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
        <Box paddingY={5}>
          <Typography variant="h5">
            2. 조사한 내용을 바탕으로 간단한 웹어플리케이션을 만들어 보여줄 수
            있는 내용은 보여준다.
          </Typography>
        </Box>
        <Box paddingY={5}>
          <Typography variant="h5">
            3. 프로젝트로 보여줄 수 없는 것들은 치트시트를 작성하여, 빠르게
            실무에 적용할 수 있다는 것을 보여준다.
          </Typography>
        </Box>
        <Box paddingY={5}>
          <Typography variant="h5">프로젝트 진행 순서</Typography>
          <Typography variant="h6">
            1. React, Node.js. MySql로 To Do List 어플리케이션 제작 및 AWS
            EC2배포{" "}
          </Typography>
          <Typography variant="h6">
            2. Docker. Kubernetes, ECS Cheet Sheet 만들어서 첨부
          </Typography>
          <Typography variant="h6">3. 도커 공부 끝내면, ECS로 배포 </Typography>
          <Typography variant="h6">4. Git Cheet Sheet 작성 및 첨부</Typography>
          <Typography variant="h6">
            5. Jenkins. CI/CD Cheet Sheet 작성 및 첨부{" "}
          </Typography>
          <Typography variant="h6">
            6. Linux Cheet Sheet 작성 및 첨부
          </Typography>
          <Typography variant="h6">
            7. 시간 남으면 Nest, TypeScript 마이그레이션{" "}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6">
            프로젝트 산출물:
            <Link href="/goal/ehdcjf" underline="hover">
              http://3.37.130.205/goal/ehdcjf
            </Link>
          </Typography>
        </Box>
      </Box>
    </DefaultLayout>
  );
}
